import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { UpdateEmailDto } from './update-email.dto';
import { Session } from '../../../../../types/session';
import { comparePasswords } from '../../../config/sessions';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../../shared/infrastructure/email-template.service';

@Injectable()
export class UpdateEmailService {
  private readonly logger = new Logger(UpdateEmailService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
  ) {}

  async execute(
    dto: UpdateEmailDto,
    sessionUser: Session['user'],
  ): Promise<Session['user']> {
    if (!sessionUser) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: sessionUser.id },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé.');
    }

    const match = await comparePasswords(dto.currentPassword, user.password);

    if (!match) {
      throw new BadRequestException('Mot de passe actuel incorrect.');
    }

    if (dto.newEmail === user.email) {
      throw new BadRequestException(
        "Le nouvel email doit être différent de l'actuel.",
      );
    }

    const existing = await this.prisma.user.findUnique({
      where: { email: dto.newEmail },
    });

    if (existing) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const updated = await this.prisma.user.update({
      where: { id: sessionUser.id },
      data: { email: dto.newEmail },
    });

    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.UPDATE,
        message: `Changement email : ${user.email} → ${updated.email}`,
      },
      sessionUser.id,
    );

    // Notification à l'ancienne adresse (sécurité)
    const oldEmailNotif = this.emailTemplate.emailChangedNotificationOld(
      user.email,
      updated.email,
    );
    this.mailer
      .sendMail({
        to: user.email,
        subject: oldEmailNotif.subject,
        html: oldEmailNotif.html,
      })
      .catch((error) => {
        this.logger.error(
          `Erreur envoi notification changement email à ${user.email}`,
          error,
        );
      });

    // Confirmation à la nouvelle adresse
    const newEmailNotif = this.emailTemplate.emailChangedNotificationNew(
      updated.email,
    );
    this.mailer
      .sendMail({
        to: updated.email,
        subject: newEmailNotif.subject,
        html: newEmailNotif.html,
      })
      .catch((error) => {
        this.logger.error(
          `Erreur envoi confirmation email à ${updated.email}`,
          error,
        );
      });

    return {
      id: updated.id,
      email: updated.email,
      firstname: updated.firstname ?? '',
      lastname: updated.lastname ?? '',
      tel: updated.tel ?? '',
      dob: updated.dob,
      role: updated.role,
    };
  }
}

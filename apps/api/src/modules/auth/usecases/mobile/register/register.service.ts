import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { createSession, generateSessionId } from '../../../config/sessions';
import { RegisterDto } from './register.dto';
import { Role } from '@mova_pilates/shared';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../../shared/infrastructure/email-template.service';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly createLogService: CreateLogService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await hashPassword(registerDto.password);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        firstname: registerDto.firstname,
        lastname: registerDto.lastname,
        tel: registerDto.tel,
        dob: registerDto.dob,
        role: Role.enum.USER,
      },
    });

    const sessionId = generateSessionId();
    const session = {
      id: user.id,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        tel: user.tel || '',
        dob: user.dob,
        role: user.role,
      },
    };

    await createSession(this.cache, sessionId, session.user);

    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.REGISTER,
        message: `Inscription de ${user?.email}`,
      },
      user.id,
    );

    // Envoi de l'email de bienvenue (non bloquant)
    const welcomeEmail = this.emailTemplate.welcomeEmail(user.firstname);
    this.mailer
      .sendMail({
        to: user.email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
      })
      .catch((error) => {
        this.logger.error(
          `Erreur envoi email bienvenue à ${user.email}`,
          error,
        );
      });

    return { sessionId, user: session };
  }
}

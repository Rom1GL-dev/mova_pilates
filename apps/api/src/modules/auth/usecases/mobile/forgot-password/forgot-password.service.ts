import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../../shared/infrastructure/email-template.service';
import {
  ForgotPasswordEmailDto,
  ForgotPasswordVerifyDto,
} from './forgot-password.dto';
import { generateOtpCode } from '../../../../../shared/utils/generate-otp';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const MAX_OTP_ATTEMPTS = 5;
const OTP_ATTEMPTS_EXPIRY_SECONDS = 900; // 15 minutes

@Injectable()
export class ForgotPasswordService {
  private readonly logger = new Logger(ForgotPasswordService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
    private readonly createLogService: CreateLogService,
  ) {}

  async requestPasswordReset(dto: ForgotPasswordEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Protection contre user enumeration : toujours retourner le même message
    // On envoie l'email seulement si l'utilisateur existe
    if (user) {
      const otp = generateOtpCode(6);
      const cacheKey = `forgot-password:${dto.email}`;

      await this.cache.set(cacheKey, otp, OTP_EXPIRY_SECONDS);

      const resetEmail = this.emailTemplate.passwordResetOtp(otp);
      this.mailer
        .sendMail({
          to: dto.email,
          subject: resetEmail.subject,
          html: resetEmail.html,
        })
        .catch((error) => {
          this.logger.error(`Erreur envoi OTP à ${dto.email}`, error);
        });
    }

    return {
      message: 'Si cet email existe, un code de vérification a été envoyé',
      email: dto.email,
    };
  }

  async verifyAndReset(dto: ForgotPasswordVerifyDto) {
    const cacheKey = `forgot-password:${dto.email}`;
    const attemptKey = `otp-attempts:${dto.email}`;

    // Vérifier le nombre de tentatives
    const attempts = (await this.cache.get<number>(attemptKey)) || 0;
    if (attempts >= MAX_OTP_ATTEMPTS) {
      throw new BadRequestException(
        'Trop de tentatives. Veuillez réessayer dans 15 minutes.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const storedOtp = await this.cache.get<string>(cacheKey);

    // Protection contre user enumeration : même message d'erreur
    if (!user || !storedOtp || storedOtp !== dto.otp) {
      // Incrémenter le compteur de tentatives
      await this.cache.set(
        attemptKey,
        attempts + 1,
        OTP_ATTEMPTS_EXPIRY_SECONDS,
      );
      throw new BadRequestException('Code OTP invalide ou expiré');
    }

    const hashedPassword = await hashPassword(dto.newPassword);

    await this.prisma.user.update({
      where: { email: dto.email },
      data: { password: hashedPassword },
    });

    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.UPDATE,
        message: `Changement de mot de passe suite à mot de passe oublié pour ${user.email}`,
      },
      user.id,
    );

    // Nettoyer le cache
    await this.cache.del(cacheKey);
    await this.cache.del(attemptKey);

    return { message: 'Mot de passe mis à jour avec succès' };
  }
}

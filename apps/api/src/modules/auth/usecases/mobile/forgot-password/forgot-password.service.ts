import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import {
  ForgotPasswordEmailDto,
  ForgotPasswordVerifyDto,
} from './forgot-password.dto';
import { generateOtpCode } from '../../../../../shared/utils/generate-otp';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly mailer: MailerService,
    private readonly createLogService: CreateLogService,
  ) {}

  async requestPasswordReset(dto: ForgotPasswordEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user)
      throw new NotFoundException('Aucun compte trouvé avec cet email');

    const otp = generateOtpCode(6);
    const cacheKey = `forgot-password:${dto.email}`;

    await this.cache.set(cacheKey, otp, 300);

    await this.mailer.sendMail({
      to: dto.email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
          <p>Voici votre code de réinitialisation :</p>
          <h2 style="font-size: 22px;">${otp}</h2>
          <p>Ce code expire dans 5 minutes.</p>
      `,
    });

    return {
      message: 'Un code de vérification a été envoyé',
      email: dto.email,
    };
  }

  async verifyAndReset(dto: ForgotPasswordVerifyDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('Utilisateur introuvable');

    const cacheKey = `forgot-password:${dto.email}`;
    const storedOtp = await this.cache.get(cacheKey);

    if (!storedOtp || storedOtp !== dto.otp) {
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
        message: `Changement de mot de passe suite à mot de passe oublié pour ${user?.email}`,
      },
      user.id,
    );

    await this.cache.del(cacheKey);

    return { message: 'Mot de passe mis à jour avec succès' };
  }
}

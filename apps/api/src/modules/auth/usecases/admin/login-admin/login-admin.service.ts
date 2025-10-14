import { Role } from '@mova_pilates/shared';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { generateOtpCode } from '../../../../../shared/utils/generate-otp';
import {
  comparePasswords,
  createSession,
  generateSessionId,
} from '../../../config/sessions';
import {
  AppType,
  LogType,
} from './../../../../logs/domain/entities/log.entity';
import { CreateLogService } from './../../../../logs/usecases/create-log/create-log.service';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly mailer: MailerService,
    private readonly createLogService: CreateLogService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const passwordMatch = await comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      await this.createLogService.execute(
        {
          appType: AppType.ADMIN,
          logType: LogType.LOGIN,
          message: `Échec de connexion pour ${user.email} : mot de passe incorrect`,
        },
        user,
      );
      throw new BadGatewayException('Mot de passe incorrect');
    }

    if (user.role !== Role.enum.ADMIN) {
      throw new NotFoundException(
        "Vous n'êtes pas autorisé à accéder à cette ressource",
      );
    }

    const otp = generateOtpCode(6);
    const cacheKey = `otp:${user.email}`;

    await this.cache.set(cacheKey, otp, 120);

    console.log(
      `[LOGIN] OTP généré pour ${user.email} | key=${cacheKey} | otp=${otp}`,
    );

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Votre code OTP Mova Pilates',
      html: `<p>Voici votre code OTP : <b>${otp}</b></p>`,
    });

    return { email: user.email, message: 'Code envoyé par e-mail' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    const cacheKey = `otp:${user.email}`;
    const storedOtp = await this.cache.get(cacheKey);

    if (!storedOtp || storedOtp !== otp) {
      throw new BadGatewayException('Code OTP invalide ou expiré');
    }

    await this.cache.del(cacheKey);

    const sessionId = generateSessionId();
    const session = {
      id: String(user.id),
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        role: user.role,
      },
    };

    await createSession(this.cache, sessionId, session.user);

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.LOGIN,
        message: `Connexion réussie pour ${user.email}`,
      },
      user,
    );

    return { sessionId, user: session };
  }
}

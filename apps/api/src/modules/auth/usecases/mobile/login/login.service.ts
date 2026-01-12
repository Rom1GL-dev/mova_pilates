import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { LoginDto } from './login.dto';
import {
  comparePasswords,
  createSession,
  generateSessionId,
} from '../../../config/sessions';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly createLogService: CreateLogService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    // Protection contre user enumeration : même message d'erreur
    const passwordMatch = user
      ? await comparePasswords(loginDto.password, user.password)
      : false;

    if (!user || !passwordMatch) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    const sessionId = generateSessionId();

    const session = {
      id: user.id,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        role: user.role,
        tel: user.tel || '',
        dob: user.dob,
      },
    };

    await createSession(this.cache, sessionId, session.user);

    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.LOGIN,
        message: `Connexion de ${user?.email}`,
      },
      user.id,
    );

    return { sessionId, user: session };
  }
}

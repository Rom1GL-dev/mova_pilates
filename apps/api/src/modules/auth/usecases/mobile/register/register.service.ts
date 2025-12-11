import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { createSession, generateSessionId } from '../../../config/sessions';
import { RegisterDto } from './register.dto';
import { Role } from '@mova_pilates/shared';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
    private readonly createLogService: CreateLogService,
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

    return { sessionId, user: session };
  }
}

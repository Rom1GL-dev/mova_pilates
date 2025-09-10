import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { CacheStorage } from '../../../../shared/ports/cache-storage';
import { createSession, generateSessionId } from '../../config/sessions';
import { RegisterDto } from './register.dto';
import { Role } from '@mova_pilates/shared';
import { hashPassword } from '../../../../shared/utils/hashPassword';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheStorage,
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
        role: Role.enum.USER,
        credit: 0,
      },
    });

    const sessionId = generateSessionId();
    const session = {
      id: user.id,
      user: {
        email: user.email,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        role: user.role,
      },
    };

    await createSession(this.cache, sessionId, session.user);

    return { sessionId, user: session };
  }
}

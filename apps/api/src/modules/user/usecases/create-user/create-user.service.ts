import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Session } from '../../../../types/session';
import { hashPassword } from '../../../../shared/utils/hashPassword';
import { CreateUserDto } from './create-user.dto';
import { RoleType } from '@mova_pilates/database';
import { Role } from '@mova_pilates/shared';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    if (user.role.includes(Role.enum.USER)) {
      throw new ConflictException(
        "Le rôle 'USER' n'est pas autorisé pour la création d'utilisateur",
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException("L'utilisateur existe déjà");
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        credit: 0,
        role: (data.role as RoleType) || Role.enum.USER,
        dob: data.dob,
        tel: data.tel,
        password: hashedPassword,
      },
    });

    return { user: newUser };
  }
}

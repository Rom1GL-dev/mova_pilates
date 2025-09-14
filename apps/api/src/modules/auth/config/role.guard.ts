// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { CacheStorage } from '../../../shared/ports/cache-storage';
import { Reflector } from '@nestjs/core';
import { getSessionStorageKey } from './storage';
import { Session } from '../../../types/session';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cache: CacheStorage,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const sessionId = req.cookies?.sessionId || req.cookies?.sessionId_admin;

    if (!sessionId) {
      throw new ForbiddenException('No session found');
    }

    // Récupère la session typée
    const user = await this.cache.get<Session['user']>(
      getSessionStorageKey(sessionId),
    );

    if (!user) {
      throw new ForbiddenException('Invalid session');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    req.user = user;
    return true;
  }
}

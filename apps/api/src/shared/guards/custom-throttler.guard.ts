import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  // Routes exemptées du rate limiting global
  private readonly exemptedPaths = [
    '/v1/backoffice/auth/admin/login',
    '/v1/backoffice/auth/verify-otp',
    '/v1/backoffice/auth/me',
    '/v1/auth/login',
    '/v1/auth/register',
    '/v1/auth/me',
  ];

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Skip si la route est exemptée
    return this.exemptedPaths.includes(request.path);
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const admin = this.reflector.get<string[]>('role', context.getHandler());
    console.log('守卫-RoleGuard', admin, req.query);
    if (admin.includes(req?.query?.role as string)) {
      return true;
    }
    return false;
  }
}

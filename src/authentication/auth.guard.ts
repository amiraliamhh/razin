import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GetRoles } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): Promise<boolean>|boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles || !request.auth) {
            return request.auth;
        }

        const userRoles = GetRoles(request.auth_user.roles);

        for (const role of roles) {
            if (userRoles.indexOf(role) > -1) {
                return true;
            }
        }

        return false;
    }
}

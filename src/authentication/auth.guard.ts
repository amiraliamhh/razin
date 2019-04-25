import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ){}

    canActivate(context: ExecutionContext): Promise<boolean>|boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('roles', roles);
        return context.switchToHttp().getRequest().auth;
    }
}

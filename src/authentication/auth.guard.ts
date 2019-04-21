import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>|boolean {        
        return context.switchToHttp().getRequest().auth;
    }
}
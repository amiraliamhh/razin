import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { IUserTokenPayload } from './auth.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.header("Authorization");
        if (token) {
            jwt.verify(token, process.env.JWT_PK, (err, payload: IUserTokenPayload) => {
                if (err) {
                    (req as any).auth = false;
                    return next();
                }
                
                (req as any).auth = payload.uuid;
                return next();
            });
        } else {
            return next();
        }
    }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserTokenPayload } from './auth.interface';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ){}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.header("Authorization");
        if (token) {
            jwt.verify(token, process.env.JWT_PK, async (err, payload: IUserTokenPayload) => {
                if (err) {
                    (req as any).auth = false;
                    return next();
                }
                
                try {
                    const users = await this.userEntity.findByIds([payload.id]);
                    const user = users[0];

                    if (!user) {
                        (req as any).auth = false;
                        return next();
                    }

                    (req as any).auth = true;
                    (req as any).auth_user = user;
                    return next();

                } catch(e) {
                    (req as any).auth = false;
                    (req as any).auth_err = e;
                    return next();
                }                
            });
        } else {
            return next();
        }
    }
}

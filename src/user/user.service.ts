import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { IDatabaseOperationResponse } from 'src/app.interface';
import { IUserSignUpPayload, IUserLoginPayload, IUserUpdateInfoPayload } from './user.interface';
import { UserEntity } from './user.entity';
import { IUserTokenPayload } from 'src/authentication/auth.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ){}

    async signUserUp({  phone_number, password }: IUserSignUpPayload): Promise<IDatabaseOperationResponse> {
        const { err, msg } = this.validate({ phone_number, password });

        if (err) {
            return { err, msg };
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        try {
            const insertResult = await this.userEntity.insert({ phone_number, password: hashedPassword });
            const jwtPayload: IUserTokenPayload = {
                phone_number,
                id: insertResult.raw[0].id,
            };
            const token = jwt.sign(jwtPayload, process.env.JWT_PK);

            return { err: false, data: { token } };
        } catch(e) {
            console.error(e);
            return { err: true, msg: e };
        }
    }

    loginUser(payload: IUserLoginPayload): IDatabaseOperationResponse {
        return {
            data: {
                token: 'token',
            },
            err: false,
        };
    }

    updateUser(payload: IUserUpdateInfoPayload): IDatabaseOperationResponse {
        return {
            data: {
                token: 'token',
            },
            err: false,
        };
    }

    private validate({ phone_number, password }: IUserSignUpPayload): { err: boolean, msg: string } {
        let err = false;
        let msg = '';
        const phoneNumberRe = /^(\+98|0|0098)?9\d{9}$/g;

        if (!phoneNumberRe.test(phone_number)) {
            err = true;
            msg = 'wrong phone number format';
        }

        if (password.length < 8) {
            err = true;
            msg = 'password should be longer than 8 characters';
        }

        return { err, msg };
    }
}
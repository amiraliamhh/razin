import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs';
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

    async signUserUp({  phone_number, password }: IUserSignUpPayload): Promise<IDatabaseOperationResponse<any>> {
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
            return { 
                err: true, 
                msg: process.env.PRODUCTION ? "error while generating jwt token" : e 
            };
        }
    }

    async loginUser(payload: IUserLoginPayload): Promise<IDatabaseOperationResponse<any>> {
        const user = await this.userEntity.findOne({
            phone_number: payload.phone_number,
            phone_number_is_approved: true,
        });
        
        if (!user) {
            return {
                err: true,
                msg: 'user not found',
                status: HttpStatus.BAD_REQUEST,
            };
        }
        
        const re = new RegExp(' ', 'g');
        const passwordMatches = await compare(payload.password, user.password.replace(re, ''));
        
        if (!passwordMatches) {
            return {
                err: true,
                msg: 'wrong password',
                status: HttpStatus.BAD_REQUEST,
            };
        }

        const jwtPayload: IUserTokenPayload = {
            id: user.id,
            phone_number: user.phone_number,
        };
        const token = jwt.sign(jwtPayload, process.env.JWT_PK);

        return {
            data: {
                first_name: user.first_name,
                last_name: user.last_name,
                token,
            },
            err: false,
        };
    }

    async updateUser(payload: IUserUpdateInfoPayload, user: UserEntity): Promise<IDatabaseOperationResponse<{}>> {
        try {
            await this.userEntity.update({
                id: user.id,
            }, this.validateUserInfo(payload));
        
            return {
                err: false,
            };

        } catch(e) {
            return {
                err: true,
                msg: process.env.PRODUCTION ? "error while updating user" : e,
            }
        }
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

    private validateUserInfo(user: IUserUpdateInfoPayload): Partial<UserEntity> {
        const allowedProps = [
            "first_name",
            "last_name",
            "address",
            "telephone",
            "postal_code",
        ];
        let userInfo: Partial<UserEntity> = {};

        for (const prop in user) {
            if (allowedProps.indexOf(prop) > -1) {
                userInfo[prop] = user[prop];
            }
        }

        return userInfo;
    }
}
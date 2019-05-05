import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserEntity } from 'src/user/user.entity';
import { IUserLoginPayload } from 'src/user/user.interface';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { IUserTokenPayload } from 'src/authentication/auth.interface';
import { GetRoles } from 'src/authentication/auth.utils';

@Injectable()
export class ManageAdminsService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>
    ) {}

    async loginAdmin(admin: IUserLoginPayload): Promise<IDatabaseOperationResponse<any>> {
        const user = await this.userEntity.findOne({
            phone_number: admin.phone_number,
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
        const passwordMatches = await compare(admin.password, user.password.replace(re, ''));
        
        if (!passwordMatches) {
            return {
                err: true,
                msg: 'wrong password',
                status: HttpStatus.BAD_REQUEST,
            };
        }

        if (GetRoles(user.roles).indexOf('admin') < 0) {
            return {
                err: true,
                msg: 'not admin',
                status: HttpStatus.FORBIDDEN,
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
}

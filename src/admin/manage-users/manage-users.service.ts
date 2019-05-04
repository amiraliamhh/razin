import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/user/user.entity';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { errorFactory } from 'src/utils/error';

@Injectable()
export class ManageUsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>,
    ) {}

    async readAllUsers(): Promise<IDatabaseOperationResponse<UserEntity[]>> {
        try {
            const users = await this.userEntity.find()
        
            return {
                data: users,
                err: false,
            };

        } catch (e) {
            return errorFactory(e, "error while reading users.");
        }
    }

    async getUserById(id: string): Promise<IDatabaseOperationResponse<UserEntity>> {
        try {
            const user = await this.userEntity.findOne({ id });

            return {
                data: user,
                err: false,
            };

        } catch (e) {
            return errorFactory(e, "error while finding user.")
        }
    }
}

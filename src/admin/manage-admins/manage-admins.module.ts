import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManageAdminsController } from './manage-admins.controller';
import { ManageAdminsService } from './manage-admins.service';
import { UserEntity } from 'src/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
    ],
    providers: [
        ManageAdminsService,
    ],
    controllers: [
        ManageAdminsController,
    ]
})
export class ManageAdminsModule {}

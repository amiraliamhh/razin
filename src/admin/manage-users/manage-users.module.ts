import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { ManageUsersController } from './manage-users.controller';
import { ManageUsersService } from './manage-users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
    ],
    controllers: [
        ManageUsersController,
    ],
    providers: [
        ManageUsersService,
    ]
})
export class ManageUsersModule {}
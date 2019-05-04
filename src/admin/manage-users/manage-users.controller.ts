import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/auth.decorator';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { UserEntity } from 'src/user/user.entity';
import { ManageUsersService } from './manage-users.service';

@Controller("admin/users")
@UseGuards(AuthGuard)
export class ManageUsersController {
    constructor(
        private readonly manageUsersService: ManageUsersService,
    ) {}

    @Get(":id")
    @Roles("admin")
    async getUserById(@Param() param: { id: string }): Promise<IDatabaseOperationResponse<UserEntity>> {
        return this.manageUsersService.getUserById(param.id);
    }

    @Get()
    @Roles("admin")
    async getAllUsers(): Promise<IDatabaseOperationResponse<UserEntity[]>> {
        return this.manageUsersService.readAllUsers()
    }

    private validateFilters(filters: Partial<UserEntity>): Partial<UserEntity> {
        const validFilters = [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address",
            "phone_number_is_approved",
            "telephone",
            "postal_code",
            "roles",
        ];
        const validatedFilters: Partial<UserEntity> = {};

        for (const filter in filters) {
            if (validFilters.indexOf(filter) > -1) {
                validatedFilters[filter] = filters[filter];
            }
        }

        return filters;
    }
}
import { Controller, Post, Put, Body, } from '@nestjs/common';
import { IUserSignUpPayload, IUserLoginPayload, IUserUpdateInfoPayload } from './user.interface';
import { UserService } from './user.service';
import { IDatabaseOperationResponse } from 'src/app.interface';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('sign-up')
    handleSignUp(@Body() body: IUserSignUpPayload): IDatabaseOperationResponse {
        return this.userService.signUserUp(body);
    }

    @Post('login')
    handleLogin(@Body() body: IUserLoginPayload): IDatabaseOperationResponse {
        return this.userService.loginUser(body);
    }

    @Put('update-info')
    handleUpdate(@Body() body: IUserUpdateInfoPayload): IDatabaseOperationResponse {
        return this.userService.updateUser(body);
    }
}

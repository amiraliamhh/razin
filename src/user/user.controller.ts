import { Controller, Post, Put, Body, Res, } from '@nestjs/common';
import { Response } from 'express';

import { IUserSignUpPayload, IUserLoginPayload, IUserUpdateInfoPayload } from './user.interface';
import { UserService } from './user.service';
import { IDatabaseOperationResponse } from 'src/app.interface';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('sign-up')
    handleSignUp(@Body() body: IUserSignUpPayload): Promise<IDatabaseOperationResponse> {
        return this.userService.signUserUp(body);
    }

    @Post('login')
    async handleLogin(@Body() body: IUserLoginPayload, @Res() res: Response) {
        const response = await this.userService.loginUser(body);
        res.status(response.status || 200).json(response);
    }

    @Put('update-info')
    handleUpdate(@Body() body: IUserUpdateInfoPayload): IDatabaseOperationResponse {
        return this.userService.updateUser(body);
    }
}

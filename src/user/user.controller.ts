import { Controller, Post, Put, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { IUserSignUpPayload, IUserLoginPayload, IUserUpdateInfoPayload } from './user.interface';
import { UserService } from './user.service';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('sign-up')
    handleSignUp(@Body() body: IUserSignUpPayload): Promise<IDatabaseOperationResponse<any>> {
        return this.userService.signUserUp(body);
    }

    @Post('login')
    async handleLogin(@Body() body: IUserLoginPayload, @Res() res: Response) {
        const response = await this.userService.loginUser(body);
        res.status(response.status || 200).json(response);
    }

    @Put('update-info')
    @UseGuards(AuthGuard)
    handleUpdate(@Body() body: IUserUpdateInfoPayload, @Req() req: any): Promise<IDatabaseOperationResponse<any>> {
        return this.userService.updateUser(body, req.auth_user);
    }
}

import { Injectable } from '@nestjs/common';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { IUserSignUpPayload, IUserLoginPayload, IUserUpdateInfoPayload } from './user.interface';

@Injectable()
export class UserService {
    signUserUp(payload: IUserSignUpPayload): IDatabaseOperationResponse {
        return { err: false };
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
}
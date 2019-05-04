import { IDatabaseOperationResponse } from "src/app.interface";

export function errorFactory(e, msg): IDatabaseOperationResponse<any> {
    return {
        err: true,
        msg: process.env.PRODUCTION ? msg : e,
    }
}
export interface IDatabaseOperationResponse<IData> {
    data?: IData;
    err: boolean;
    msg?: string;
    status?: number;
}
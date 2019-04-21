export interface IUserSignUpPayload {
    phone_number: string;
    password: string;
}

export interface IUserLoginPayload {
    phone_number: string;
    password: string;
}

export interface IUserUpdateInfoPayload {
    old_password: string;
    new_password: string;
    first_name: string;
    last_name: string;
    address: string;
    telephone: string;
    postal_code: string;
}

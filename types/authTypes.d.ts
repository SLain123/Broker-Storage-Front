import { IResponseError } from 'types/commonTypes';

export interface IRegRequiest {
    email: string;
    password: string;
    nickName: string;
    defaultCurrencyId: string;
}

export interface IRegResponse {
    message?: string;
    data?: IResponseError;
}

export interface ILoginRequiest {
    email: string;
    password: string;
}

export interface IUserData {
    token: string;
    userId: string;
}

export interface IAuthStore extends IUserData {
    isAuth: boolean | 'not_verified';
}

export interface ILoginResponse extends Partial<IUserData> {
    message?: string;
    data?: IResponseError;
}

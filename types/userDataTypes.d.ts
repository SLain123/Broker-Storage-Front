import { ICurrency } from './currencyTypes';

export interface IUserData {
    _id: string;
    email: string;
    nickName: string;
    role: 'user' | 'admin';
    defaultCurrency: ICurrency;
    avatar: Base64 | null;
    brokerAccounts: IBroker[];
}

export interface IUserRequiest {
    nickName: string;
    defaultCurrencyId: string;
}

export interface IGetProfileResponse {
    message?: string;
    user?: IUserData;
    data?: IResponseError;
}

export interface IChangeUserResponse {
    message?: string;
    data?: IResponseError;
}

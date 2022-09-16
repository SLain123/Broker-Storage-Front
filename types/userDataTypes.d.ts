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

export interface IGetProfileResponse {
    message?: string;
    user?: IUserData
}
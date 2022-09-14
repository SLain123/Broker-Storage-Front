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

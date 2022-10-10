import { ICurrency } from './currencyTypes';
import { IResponseError } from './commonTypes';

export interface IDividend {
    _id: string;
    date: Date;
    currency: ICurrency;
    sumPriceBuyngStoсk: number;
    payment: number;
}

export interface ICreateBaseReq {
    date: string;
    payment: number;
}

export interface ICreateDividendReq extends ICreateBaseReq {
    stockId: string;
}

export interface ICreatePaymentReq extends ICreateBaseReq {
    activeId: string;
}

export interface ICreateDividendRes {
    message?: string;
    payment?: IDividend;
    data?: IResponseError;
}

export interface IRemoveDividendReq {
    id: string;
}

export interface IRemoveDividendRes {
    message?: string;
    data?: IResponseError;
}

import { ICurrency } from './currencyTypes';
import { IResponseError } from './commonTypes';

export interface IDividend {
    date: Date;
    currency: ICurrency;
    sumPriceBuyngStoсk: number;
    payment: number;
}

export interface ICreateDividendReq {
    stockId: string;
    date: string;
    payment: number;
}

export interface ICreateDividendRes {
    message?: string;
    // stock?: IStock;
    data?: IResponseError;
}
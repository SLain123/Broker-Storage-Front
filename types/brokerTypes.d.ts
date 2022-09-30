import { ICurrency } from './currencyTypes';
import { CommonStatus } from './commonTypes';

export interface IBroker {
    _id: string;
    title: string;
    currency: ICurrency;
    cash: number;
    sumStocks: number;
    sumBalance: number;
    status: CommonStatus;
}

export interface ICreateBrokerReq {
    title: string;
    currencyId: string;
    cash: string | number;
}

export interface ICreateBrokerRes {
    message?: string;
    data?: IBroker;
    data?: IResponseError;
}

export interface IEditBrokerReq extends ICreateBrokerReq {
    id: string;
    status?: CommonStatus;
}

export interface IBrokerAccountsRes {
    brokerAccounts?: IBroker[];
    message?: string;
    data?: IResponseError;
}

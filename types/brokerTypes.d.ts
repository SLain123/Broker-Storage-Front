import { ICurrency } from './currencyTypes';

export type BrokerStatus = 'active' | 'inactive';

export interface IBroker {
    _id: string;
    title: string;
    currency: ICurrency;
    cash: number;
    sumStocks: number;
    sumBalance: number;
    status: BrokerStatus;
}

export interface ICreateBrokerReq {
    title: string;
    cash: string | number;
}

export interface ICreateBrokerRes {
    message?: string;
    data?: IBroker;
    data?: IResponseError;
}

export interface IEditBrokerReq extends ICreateBrokerReq {
    id: string;
    status?: BrokerStatus;
}

export interface IBrokerAccountsRes {
    brokerAccounts?: IBroker[];
    message?: string;
    data?: IResponseError;
}

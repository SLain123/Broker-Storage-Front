import { ICurrency } from './currencyTypes';
import { IBroker } from './brokerTypes';
import { IDividend } from './dividendTypes';
import { IResponseError } from './commonTypes';

export enum StockStatus {
    active = 'active',
    closed = 'closed',
}

export enum StockType {
    stock = 'stock',
    bond = 'bond',
    futures = 'futures',
    currency = 'currency',
}

export enum StockAction {
    buy = 'buy',
    sell = 'sell',
}

export interface IHistory {
    date: Date;
    count: number;
    pricePerSingle: number;
    fee: number;
    action: StockAction;
}

export interface IStock {
    _id: string;
    status: StockStatus;
    lastEditedDate: Date;
    title: string;
    restCount: number;
    deltaBuy: number;
    deltaSell: number;
    fee: number;
    currency: ICurrency;
    broker: IBroker;
    type: StockType;
    history: string[];
    profit?: number;
    dividends?: string[];
}

export interface IStockFull extends IStock {
    history: IHistory[];
}

export interface IStockFilters {
    brokerId?: string;
    currencyId?: string;
    year?: string | number;
    status?: StockStatus;
    type?: StockType;
}

export interface IGetStockReq {
    id: string;
}

export interface IGetStockRes {
    message?: string;
    stock?: IStock;
    data?: IResponseError;
}

export interface IGetAllStocksReq {
    filters?: IStockFilters;
}

export interface IGetAllStocksRes {
    message?: string;
    stocks?: IStock[];
    data?: IResponseError;
}

export interface ICreateStockReq {
    date: string;
    title: string;
    count: number;
    pricePerSingle: number;
    fee: number;
    brokerId: string;
    type?: StockType | '';
}

export interface ICreateStockRes {
    message?: string;
    stock?: IStock;
    data?: IResponseError;
}

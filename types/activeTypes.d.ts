import { ICurrency } from './currencyTypes';
import { IDividend } from './dividendTypes';

export enum ActiveStatus {
    active = 'active',
    inactive = 'inactive',
}

export interface IActive {
    _id: string;
    title: string;
    currency: ICurrency;
    cash: number;
    dividends?: IDividend[];
    status: ActiveStatus;
}

export interface IActiveFilters {
    currencyId?: string;
    status?: ActiveStatus;
}

export interface IGetActiveReq {
    id: string;
}

export interface IGetActiveRes {
    message?: string;
    active?: IActive;
    data?: IResponseError;
}

export interface IGetAllActivessReq {
    filters?: IActiveFilters;
}

export interface IGetAllActivessRes {
    message?: string;
    actives?: IActive[];
    data?: IResponseError;
}

export interface ICreateActiveReq {
    title: string;
    currencyId: string;
    cash: number;
}

export interface ICreateActiveRes {
    message?: string;
    active?: IActive;
    data?: IResponseError;
}
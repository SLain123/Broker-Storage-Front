import { ICurrency } from './currencyTypes';
import { IDividend } from './dividendTypes';

export type ActiveStatusType = 'active' | 'inactive';

export interface IActive {
    _id: string;
    title: string;
    currency: ICurrency;
    cash: number;
    dividends?: IDividend[];
    status: ActiveStatusType;
}

export interface IActiveFilters {
    currencyId?: string;
    status?: ActiveStatusType;
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

export interface IEditActiveReq {
    id: string;
    title: string;
    currencyId: string;
    cash: number | string;
    status: ActiveStatusType;
}

export interface IResultActiveRes {
    message?: string;
    data?: IResponseError;
}

export interface IRemoveActiveReq {
    id: string;
}

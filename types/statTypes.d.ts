import { IBroker } from 'types/brokerTypes';
import { ICurrency } from 'types/currencyTypes';
import { StockType, IStock } from 'types/stockTypes';

export interface IFeeResult {
    fee: number;
    currency: ICurrency;
    broker: IBroker;
}

export interface IPaymentsResult {
    title: string;
    currency: ICurrency;
    allPayments: number;
    totalAmountOfInvest: number;
}

export interface IDividendResult {
    currency: ICurrency;
    type: StockType;
    allPayments: number;
    totalAmountOfInvest: number;
}

export interface IYearFilter {
    byYear: number;
}

export interface IGetFeeRes {
    message?: string;
    result?: IFeeResult[];
}

export interface IGetPaymentsRes {
    message?: string;
    result?: IPaymentsResult[];
}

export interface IGetDividendsRes {
    message?: string;
    result?: IDividendResult[];
}

export interface IGetProfitReq {
    brokerId?: string;
    currencyId?: string;
    year?: number;
    plusInactiveBrokers?: boolean;
    plusDividends?: boolean;
}

export interface IGetProfitRes {
    message?: string;
    sumProfit?: number;
    filtredList?: IStock[];
}

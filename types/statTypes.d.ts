import { IBroker } from 'types/brokerTypes';
import { ICurrency } from 'types/currencyTypes';
import { StockType } from 'types/stockTypes';

interface IFeeResult {
    fee: number;
    currency: ICurrency;
    broker: IBroker;
}

interface IPaymentsResult {
    title: string;
    currency: ICurrency;
    allPayments: number;
    totalAmountOfInvest: number;
}

interface IDividendResult {
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

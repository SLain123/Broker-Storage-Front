import { ICurrency } from './currencyTypes';
import { StatusType } from './commonTypes';

export interface IBroker {
    _id: string;
    title: string;
    currency: ICurrency;
    cash: number;
    sumStocks: number;
    sumBalance: number;
    status: StatusType;
}

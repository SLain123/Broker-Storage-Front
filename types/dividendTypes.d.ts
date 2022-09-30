import { ICurrency } from './currencyTypes';

export interface IDividend {
    date: Date;
    currency: ICurrency;
    sumPriceBuyngStoсk: number;
    payment: number;
}

export interface ICurrency {
    _id: string;
    title: string;
    ticker: string;
}

export interface ICurrencyResponse {
    message?: string;
    currencies?: ICurrency[];
}
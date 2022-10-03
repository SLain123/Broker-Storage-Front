import { ICreateStockRes } from 'types/stockTypes';
import { SerializedError, FetchBaseQueryError } from '@reduxjs/toolkit';

export interface ICreateStatusBlock {
    data: ICreateStockRes;
    error: FetchBaseQueryError | SerializedError;
}

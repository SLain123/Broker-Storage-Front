import { SerializedError, FetchBaseQueryError } from '@reduxjs/toolkit';

export interface IFormStatusBlock<T> {
    data: T;
    error: FetchBaseQueryError | SerializedError;
}

export interface ICommonInformation {
    message?: string;
    data?: IResponseError;
}

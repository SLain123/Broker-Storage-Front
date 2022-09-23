import { SerializedError } from '@reduxjs/toolkit';
import { IRegResponse } from 'types/authTypes';

export interface IInitialValues {
    email: string;
    password: string;
    confirmPassword: string;
    nickName: string;
    defaultCurrencyId: string;
}

export interface IRegStatusBlock {
    data: IRegResponse;
    error: IRegResponse | SerializedError;
}

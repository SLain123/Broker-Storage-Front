import { FormikConfig } from 'formik';
import { SerializedError } from '@reduxjs/toolkit';
import { ILogingResponse } from 'types/authTypes';

export interface IInitialValues {
    email: string;
    password: string;
}

export interface ILoginStatusBlock {
    data: ILoginResponse;
    error: ILoginResponse | SerializedError;
}

import { FormikConfig } from 'formik';
import { SerializedError } from '@reduxjs/toolkit';
import { IRegResponse } from 'types/registerTypes';

export interface IInitialValues {
    email: string;
    password: string;
    confirmPassword: string;
    nickName: string;
    defaultCurrencyId: string;
}

export interface ICurrencySelect {
    dropdownRef: React.MutableRefObject<SelectDropdown>;
    formik: FormikConfig;
    isDisabled: boolean;
}

export interface IStatusBlock {
    data: IRegResponse;
    error: IRegResponse | SerializedError;
}

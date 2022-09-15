import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { IAuthStore, ILoginResponse } from 'types/authTypes';

const initialState: IAuthStore = {
    token: '',
    userId: '',
    isAuth: 'not_verified',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthData: (_state, action: PayloadAction<ILoginResponse>) => {
            return { ...action.payload, isAuth: true };
        },
    },
});

export const { setAuthData } = authSlice.actions;

export const getAuthData = (state: RootState) => state.auth;

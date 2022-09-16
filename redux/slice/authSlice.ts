import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { IAuthStore } from 'types/authTypes';

const initialState: IAuthStore = {
    isAuth: 'not_verified',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthStatus: (_state, action: PayloadAction<boolean>) => {
            return { isAuth: action.payload };
        },
    },
});

export const { setAuthStatus } = authSlice.actions;

export const getAuthStatus = (state: RootState) => state.auth.isAuth;

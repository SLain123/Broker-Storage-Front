import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { IAuthStore } from 'types/authTypes';

const initialState: IAuthStore = {
    isAuth: 'not_verified',
    pin: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthStatus: (state, action: PayloadAction<boolean>) => {
            return { ...state, isAuth: action.payload };
        },
        setPin: (state, action: PayloadAction<number[]>) => {
            return { ...state, pin: action.payload };
        },
    },
});

export const { setAuthStatus, setPin } = authSlice.actions;

export const getAuthStatus = (state: RootState) => state.auth.isAuth;
export const getPin = (state: RootState) => state.auth.pin;

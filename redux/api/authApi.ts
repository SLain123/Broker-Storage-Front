import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
} from '@reduxjs/toolkit/query/react';
import {
    IRegRequiest,
    IRegResponse,
    ILoginResponse,
    ILoginRequiest,
} from 'types/authTypes';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
    }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        IRegResponse,
        ILoginResponse
    >,
    tagTypes: ['Register'],
    endpoints: (builder) => ({
        makeRegister: builder.mutation<IRegResponse, IRegRequiest>({
            query: ({ email, password, nickName, defaultCurrencyId }) => ({
                url: 'auth/register',
                method: 'POST',
                body: { email, password, nickName, defaultCurrencyId },
            }),
        }),
        makeLogin: builder.mutation<ILoginResponse, ILoginRequiest>({
            query: ({ email, password }) => ({
                url: 'auth/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
    }),
});

export const { useMakeRegisterMutation, useMakeLoginMutation } = authApi;

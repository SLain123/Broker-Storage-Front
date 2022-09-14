import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { IRegRequiest, IRegResponse } from 'types/authTypes';

export const authApi = createApi({
    reducerPath: 'register',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
    }) as BaseQueryFn<string | FetchArgs, unknown, IRegResponse, IRegResponse>,
    tagTypes: ['Register'],
    endpoints: (builder) => ({
        makeRegister: builder.mutation<IRegResponse, IRegRequiest>({
            query: ({ email, password, nickName, defaultCurrencyId }) => ({
                url: 'auth/register',
                method: 'POST',
                body: { email, password, nickName, defaultCurrencyId },
            }),
        }),
    }),
});

export const { useMakeRegisterMutation } = authApi;

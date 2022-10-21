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
    IValidationCheckResponse,
} from 'types/authTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }) as BaseQueryFn<string | FetchArgs, unknown, IRegResponse, unknown>,

    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        makeRegister: builder.mutation<IRegResponse, IRegRequiest>({
            query: ({ email, password, nickName, defaultCurrencyId }) => ({
                url: 'auth/register',
                method: 'POST',
                body: {
                    email: email.toLowerCase(),
                    password,
                    nickName,
                    defaultCurrencyId,
                },
            }),
        }),
        makeLogin: builder.mutation<ILoginResponse, ILoginRequiest>({
            query: ({ email, password }) => ({
                url: 'auth/login',
                method: 'POST',
                body: { email: email.toLowerCase(), password },
            }),
        }),
        checkAuth: builder.query<IValidationCheckResponse, void>({
            query: () => ({
                url: 'auth/check',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useMakeRegisterMutation,
    useMakeLoginMutation,
    useCheckAuthQuery,
} = authApi;

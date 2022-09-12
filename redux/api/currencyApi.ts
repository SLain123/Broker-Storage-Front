import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICurrencyResponse } from 'types/currencyTypes';

export const currencyApi = createApi({
    reducerPath: 'currency',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
    }),
    tagTypes: ['Currency'],
    endpoints: (builder) => ({
        getCurrencyList: builder.query<ICurrencyResponse, void>({
            query: () => 'currency',
        }),
    }),
});

export const { useGetCurrencyListQuery } = currencyApi;

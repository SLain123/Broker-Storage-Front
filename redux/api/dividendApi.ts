import { baseUrl } from './base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ICreateDividendReq,
    ICreateDividendRes,
    IRemoveDividendReq,
    IRemoveDividendRes,
} from 'types/dividendTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const dividendApi = createApi({
    reducerPath: 'dividend',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Dividend'],
    endpoints: (builder) => ({
        createDiv: builder.mutation<ICreateDividendRes, ICreateDividendReq>({
            query: ({ stockId, date, payment }) => ({
                url: 'dividend/create',
                method: 'POST',
                body: {
                    stockId,
                    date,
                    payment: +payment,
                },
            }),
            invalidatesTags: ['Dividend'],
        }),
        removeDiv: builder.mutation<IRemoveDividendRes, IRemoveDividendReq>({
            query: ({ id }) => ({
                url: 'dividend/remove',
                method: 'POST',
                body: {
                    id,
                },
            }),
            invalidatesTags: ['Dividend'],
        }),
    }),
});

export const { useCreateDivMutation, useRemoveDivMutation } = dividendApi;

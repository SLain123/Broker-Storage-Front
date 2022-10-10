import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ICreatePaymentReq,
    ICreateDividendRes,
    IRemoveDividendReq,
    IRemoveDividendRes,
} from 'types/dividendTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const paymentsApi = createApi({
    reducerPath: 'payments',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Payments'],
    endpoints: (builder) => ({
        createPayment: builder.mutation<ICreateDividendRes, ICreatePaymentReq>({
            query: ({ activeId, date, payment }) => ({
                url: 'active/pay/create',
                method: 'POST',
                body: {
                    activeId,
                    date,
                    payment: +payment,
                },
            }),
            invalidatesTags: ['Payments'],
        }),
        removePayment: builder.mutation<IRemoveDividendRes, IRemoveDividendReq>({
            query: ({ id }) => ({
                url: '/active/pay/remove',
                method: 'POST',
                body: {
                    id,
                },
            }),
            invalidatesTags: ['Payments'],
        }),
    }),
});

export const { useCreatePaymentMutation, useRemovePaymentMutation } = paymentsApi;

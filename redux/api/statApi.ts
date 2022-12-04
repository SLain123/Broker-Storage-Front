import { baseUrl } from './base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IYearFilter,
    IGetFeeRes,
    IGetPaymentsRes,
    IGetDividendsRes,
    IGetProfitReq,
    IGetProfitRes,
} from 'types/statTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const statApi = createApi({
    reducerPath: 'stat',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Stat'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getFee: builder.query<IGetFeeRes, Partial<IYearFilter>>({
            query: ({ byYear }) => ({
                url: 'stat/fee',
                method: 'POST',
                body: { byYear },
            }),
        }),
        getPayments: builder.query<IGetPaymentsRes, Partial<IYearFilter>>({
            query: ({ byYear }) => ({
                url: 'stat/dividends/active',
                method: 'POST',
                body: { byYear },
            }),
        }),
        getDividends: builder.query<IGetDividendsRes, Partial<IYearFilter>>({
            query: ({ byYear }) => ({
                url: 'stat/dividends',
                method: 'POST',
                body: { byYear },
            }),
        }),
        getProfit: builder.query<IGetProfitRes, Partial<IGetProfitReq>>({
            query: ({
                year,
                plusDividends,
                plusInactiveBrokers,
                brokerId,
            }) => ({
                url: 'stat/profit',
                method: 'POST',
                body: {
                    filters: {
                        year,
                        plusDividends,
                        plusInactiveBrokers,
                        brokerId,
                    },
                },
            }),
        }),
    }),
});

export const {
    useGetFeeQuery,
    useGetPaymentsQuery,
    useGetDividendsQuery,
    useGetProfitQuery,
} = statApi;

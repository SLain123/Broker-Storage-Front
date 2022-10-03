import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IGetStockRes,
    IGetStockReq,
    IGetAllStocksReq,
    IGetAllStocksRes,
    ICreateStockReq,
    ICreateStockRes,
} from 'types/stockTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const stockApi = createApi({
    reducerPath: 'stock',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Stock'],
    endpoints: (builder) => ({
        getStock: builder.mutation<IGetStockRes, IGetStockReq>({
            query: ({ id }) => ({
                url: 'stock',
                method: 'POST',
                body: { id },
            }),
        }),
        getAllStockList: builder.mutation<IGetAllStocksRes, IGetAllStocksReq>({
            query: ({ filters }) => ({
                url: 'stock/all',
                method: 'POST',
                body: { filters },
            }),
        }),
        createStock: builder.mutation<ICreateStockRes, ICreateStockReq>({
            query: ({
                date,
                title,
                count,
                pricePerSingle,
                fee,
                brokerId,
                type = 'stock',
            }) => ({
                url: 'stock/create',
                method: 'POST',
                body: {
                    date,
                    title,
                    count: +count,
                    pricePerSingle: +pricePerSingle,
                    fee: +fee,
                    brokerId,
                    type,
                },
            }),
        }),
    }),
});

export const {
    useGetStockMutation,
    useGetAllStockListMutation,
    useCreateStockMutation,
} = stockApi;

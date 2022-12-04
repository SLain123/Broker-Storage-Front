import { baseUrl } from './base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IGetStockRes,
    IGetStockReq,
    IGetAllStocksReq,
    IGetAllStocksRes,
    ICreateStockReq,
    ICreateStockRes,
    IAddStockRes,
    IAddStockReq,
    IRemoveStockReq,
    IRemoveStockRes,
} from 'types/stockTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const stockApi = createApi({
    reducerPath: 'stock',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Stock'],
    endpoints: (builder) => ({
        getStock: builder.query<IGetStockRes, IGetStockReq>({
            query: ({ id }) => ({
                url: 'stock',
                method: 'POST',
                body: { id },
            }),
            providesTags: ['Stock'],
        }),
        getAllStockList: builder.query<IGetAllStocksRes, IGetAllStocksReq>({
            query: ({ filters }) => ({
                url: 'stock/all',
                method: 'POST',
                body: { filters },
            }),
            providesTags: ['Stock'],
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
            invalidatesTags: ['Stock'],
        }),
        addStock: builder.mutation<IAddStockRes, IAddStockReq>({
            query: ({ id, action, date, count, pricePerSingle, fee }) => ({
                url: 'stock/add',
                method: 'POST',
                body: {
                    id,
                    action,
                    date,
                    count: +count,
                    pricePerSingle: +pricePerSingle,
                    fee: +fee,
                },
            }),
            invalidatesTags: ['Stock'],
        }),
        removeStock: builder.mutation<IRemoveStockRes, IRemoveStockReq>({
            query: ({ id }) => ({
                url: 'stock/remove',
                method: 'POST',
                body: {
                    id,
                },
            }),
            invalidatesTags: ['Stock'],
        }),
    }),
});

export const {
    useGetStockQuery,
    useGetAllStockListQuery,
    useCreateStockMutation,
    useAddStockMutation,
    useRemoveStockMutation,
} = stockApi;

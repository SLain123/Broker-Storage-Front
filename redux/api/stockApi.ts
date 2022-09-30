import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllStockReq, IGetAllStockRes } from 'types/stockTypes';
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
        getAllStockList: builder.mutation<IGetAllStockRes, IGetAllStockReq>({
            query: ({ filters }) => ({
                url: 'stock/all',
                method: 'POST',
                body: { filters },
            }),
        }),
    }),
});

export const { useGetAllStockListMutation } = stockApi;

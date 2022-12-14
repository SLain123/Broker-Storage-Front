import { baseUrl } from './base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ICreateBrokerReq,
    ICreateBrokerRes,
    IEditBrokerReq,
    IBrokerAccountsRes,
} from 'types/brokerTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const brokerApi = createApi({
    reducerPath: 'broker',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Broker'],
    endpoints: (builder) => ({
        getBrokerList: builder.query<IBrokerAccountsRes, void>({
            query: () => 'broker',
            providesTags: ['Broker'],
        }),
        createBroker: builder.mutation<ICreateBrokerRes, ICreateBrokerReq>({
            query: ({ title, currencyId, cash }) => ({
                url: 'broker',
                method: 'POST',
                body: { title, currencyId, cash: +cash },
            }),
            invalidatesTags: ['Broker'],
        }),
        editBroker: builder.mutation<ICreateBrokerRes, IEditBrokerReq>({
            query: ({ id, title, currencyId, cash, status = 'active' }) => ({
                url: 'broker/correct',
                method: 'POST',
                body: { id, title, currencyId, cash: +cash, status },
            }),
            invalidatesTags: ['Broker'],
        }),
    }),
});

export const {
    useGetBrokerListQuery,
    useCreateBrokerMutation,
    useEditBrokerMutation,
} = brokerApi;

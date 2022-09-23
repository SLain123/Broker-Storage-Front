import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateBrokerReq, ICreateBrokerRes } from 'types/brokerTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const brokerApi = createApi({
    reducerPath: 'broker',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Broker'],
    endpoints: (builder) => ({
        createBroker: builder.mutation<ICreateBrokerRes, ICreateBrokerReq>({
            query: ({ title, currencyId, cash }) => ({
                url: 'broker',
                method: 'POST',
                body: { title, currencyId, cash },
            }),
        }),
    }),
});

export const { useCreateBrokerMutation } = brokerApi;

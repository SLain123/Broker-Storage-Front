import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IGetActiveRes,
    IGetActiveReq,
    IGetAllActivessReq,
    IGetAllActivessRes,
    ICreateActiveRes,
    ICreateActiveReq,
} from 'types/activeTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const activeApi = createApi({
    reducerPath: 'active',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Active'],
    endpoints: (builder) => ({
        getActive: builder.query<IGetActiveRes, IGetActiveReq>({
            query: ({ id }) => ({
                url: 'active',
                method: 'POST',
                body: { id },
            }),
            providesTags: ['Active'],
        }),
        getAllActiveList: builder.query<
            IGetAllActivessRes,
            Partial<IGetAllActivessReq>
        >({
            query: ({ filters }) => ({
                url: 'active/all',
                method: 'POST',
                body: { filters },
            }),
            providesTags: ['Active'],
        }),
        createActive: builder.mutation<ICreateActiveRes, ICreateActiveReq>({
            query: ({ title, currencyId, cash }) => ({
                url: 'active/create',
                method: 'POST',
                body: {
                    title,
                    currencyId,
                    cash: +cash,
                },
            }),
            invalidatesTags: ['Active'],
        }),
    }),
});

export const {
    useGetActiveQuery,
    useGetAllActiveListQuery,
    useCreateActiveMutation,
} = activeApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IGetActiveRes,
    IGetActiveReq,
    IGetAllActivessReq,
    IGetAllActivessRes,
    ICreateActiveRes,
    ICreateActiveReq,
    IEditActiveReq,
    IResultActiveRes,
    IRemoveActiveReq,
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
        editActive: builder.mutation<IResultActiveRes, IEditActiveReq>({
            query: ({ id, title, currencyId, cash, status }) => ({
                url: 'active/correct',
                method: 'POST',
                body: {
                    id,
                    title,
                    currencyId,
                    cash: +cash,
                    status,
                },
            }),
            invalidatesTags: ['Active'],
        }),
        removeActive: builder.mutation<IResultActiveRes, IRemoveActiveReq>({
            query: ({ id }) => ({
                url: 'active/remove',
                method: 'POST',
                body: {
                    id,
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
    useEditActiveMutation,
    useRemoveActiveMutation,
} = activeApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateDividendReq, ICreateDividendRes } from 'types/dividendTypes';
import { getValueFromStore } from 'utils/secureStoreFuncs';

export const dividendApi = createApi({
    reducerPath: 'dividend',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
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
    }),
});

export const { useCreateDivMutation } = dividendApi;

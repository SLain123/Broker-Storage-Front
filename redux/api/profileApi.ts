import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetProfileResponse } from 'types/userDataTypes';

import { getValueFromStore } from 'utils/secureStoreFuncs';

export const profileApi = createApi({
    reducerPath: 'profile',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://unified-broker.herokuapp.com/api/',
        prepareHeaders: async (headers) => {
            const token = await getValueFromStore('token');
            token && headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getUserProfile: builder.query<IGetProfileResponse, void>({
            query: () => 'profile',
        }),
    }),
});

export const { useGetUserProfileQuery } = profileApi;

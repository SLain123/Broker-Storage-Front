import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetProfileResponse } from 'types/userDataTypes';

import { getValueFromStore } from 'utils/secureStoreFuncs';
import { IUserRequiest, IChangeUserResponse } from 'types/userDataTypes';

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
        changeUserData: builder.mutation<IChangeUserResponse, IUserRequiest>({
            query: ({ nickName, defaultCurrencyId }) => ({
                url: 'profile',
                method: 'POST',
                body: { nickName, defaultCurrencyId },
            }),
        }),
    }),
});

export const { useGetUserProfileQuery, useChangeUserDataMutation } = profileApi;

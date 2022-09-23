import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'api/authApi';
import { currencyApi } from 'api/currencyApi';
import { profileApi } from 'api/profileApi';
import { brokerApi } from 'api/brokerApi';

import { authSlice } from 'slice/authSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [currencyApi.reducerPath]: currencyApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [brokerApi.reducerPath]: brokerApi.reducer,
        //slice
        [authSlice.name]: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            currencyApi.middleware,
            profileApi.middleware,
            brokerApi.middleware,
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

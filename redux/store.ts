import { configureStore } from '@reduxjs/toolkit';
import { registerApi } from 'api/registerApi';
import { currencyApi } from 'api/currencyApi';

export const store = configureStore({
    reducer: {
        [registerApi.reducerPath]: registerApi.reducer,
        [currencyApi.reducerPath]: currencyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            registerApi.middleware,
            currencyApi.middleware,
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

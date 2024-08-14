import { configureStore } from '@reduxjs/toolkit';
import { artworkApi } from './services/artwork';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [artworkApi.reducerPath]: artworkApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(artworkApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

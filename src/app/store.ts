import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { breedsDogApi } from '../services/api';
import breedSlice from '../features/breeds/breedSlice';

export const store = configureStore({
  reducer: {
    [breedsDogApi.reducerPath]: breedsDogApi.reducer,
    breed: breedSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(breedsDogApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)
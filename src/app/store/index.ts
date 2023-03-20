import { configureStore } from '@reduxjs/toolkit';
import { calcModel } from 'entities/calc-blocks';

export const store = configureStore({
  reducer: {
    calc: calcModel.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

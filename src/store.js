import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './services/moviesApi';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export default store;

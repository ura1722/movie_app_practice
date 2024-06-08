import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './services/moviesApi';
import searchReducer from './slices/searchSlice';
import sessionReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    search: searchReducer,
    session: sessionReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './services/moviesApi';
import searchReducer from './slices/searchSlice';
import sessionReducer from './slices/sessionSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    search: searchReducer,
    session: sessionReducer, 
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export default store;

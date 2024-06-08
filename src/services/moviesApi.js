import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store from '../store';

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API;
const URL_API = "https://api.themoviedb.org/3";

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_API }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ query, page = 1 }) => {
        const url = query ? 'search/movie' : 'discover/movie';
        const params = query ? { api_key: API_KEY, query, page } : { api_key: API_KEY, page };
        return { url, params };
      },
      transformResponse: (response) => ({
        results: response.results,
        totalResults: response.total_results,
      }),
    }),
    fetchMovie: builder.query({
      query: (id) => ({
        url: `movie/${id}`,
        params: { api_key: API_KEY, append_to_response: 'videos' },
      }),
      transformResponse: (response) => response,
    }),
    fetchToken: builder.query({
      query: () => ({
        url: `authentication/token/new`,
        params: { api_key: API_KEY},
      }),
      transformResponse: (response) => response,
    }),
    validateToken: builder.query({
      query: ({ username, password, request_token }) => ({
        url: 'authentication/token/validate_with_login',
        method: 'POST',
        body: {
          username,
          password,
          request_token,
        },
        params: { api_key: API_KEY },
      }),
      transformResponse: (response) => response,
    }),
    createSession: builder.query({
      query: (request_token) => ({
        url: 'authentication/session/new',
        method: 'POST',
        body: { request_token },
        params: { api_key: API_KEY },
      }),
      transformResponse: (response) => response,
    }),
    fetchDetails: builder.query({
      query: () => ({
        url: 'account',  
        params: { api_key: API_KEY, session_id: store.getState().session.sessionId },
      }),
      transformResponse: (response) => response,
    }),
    fetchWatchlist: builder.query({
      query: (accountId) => {
        const url = `account/${accountId}/watchlist/movies`;
        const params = { api_key: API_KEY, session_id: store.getState().session.sessionId };
        return { url, params };
      },
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetMoviesQuery, useFetchMovieQuery, useFetchTokenQuery, useLazyValidateTokenQuery, useLazyCreateSessionQuery, useFetchWatchlistQuery,  useFetchDetailsQuery} = moviesApi;

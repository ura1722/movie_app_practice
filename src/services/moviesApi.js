import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store from '../store';

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API;
const URL_API = "https://api.themoviedb.org/3";

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_API }),
  tagTypes: ['MovieWatch','Account'], 
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ query, page = 1, genreIds = [] , sort_by, with_origin_country}) => {
        const url = query ? 'search/movie' : 'discover/movie';
        
        const params = {
          api_key: API_KEY,
          sort_by,
          page,
          language: 'uk-UA',
          ...(query && { query }),
          ...(genreIds.length > 0 && { with_genres: genreIds.join(',') }),
          with_origin_country,
        };
        return { url, params };
      },
      transformResponse: (response) => ({
        results: response.results,
        totalResults: response.total_results,
      }),
    }),
    getGenres: builder.query({
      query: () => ({
        url: 'genre/movie/list',
        params: { api_key: API_KEY, language: 'uk-UA' },
      }),
    }),
    getCountries: builder.query({
      query: () => ({
        url: 'configuration/countries',
        params: { api_key: API_KEY, language: 'uk-UA' },
      }),
    }),
    fetchMovie: builder.query({
      query: (id) => ({
        url: `movie/${id}`,
        params: { api_key: API_KEY, language: 'uk-UA' ,append_to_response: 'videos,credits' },
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
      invalidatesTags: ['Account'], 
      
    }),
    fetchWatchlist: builder.query({
      query: () => {
        const sessionId = store.getState().session.sessionId;
        const accountId = store.getState().session.accountId;
        return {
          url: `account/${accountId}/watchlist/movies`,
          params: { api_key: API_KEY, session_id: sessionId, language: 'uk-UA'},
        };
      },
      transformResponse: (response) => response,
      providesTags: ['MovieWatch'],
    }),
    getRecommendations: builder.query({
      query: (movieId) => {
        const sessionId = store.getState().session.sessionId;
        return {
          url: `movie/${movieId}/recommendations`,
          params: { api_key: API_KEY, session_id: sessionId, language: 'uk-UA'},
        };
      },
      transformResponse: (response) => response,
    }),
    addToWatchlist: builder.mutation({
      query: ({ mediaId, mediaType, watchlist }) => {
        const sessionId = store.getState().session.sessionId;
        const accountId = store.getState().session.accountId;
        return {
          url: `account/${accountId}/watchlist`,
          method: 'POST',
          params: { api_key: API_KEY, session_id: sessionId },
          body: {
            media_type: mediaType,
            media_id: mediaId,
            watchlist: watchlist
          },
        };
      },
      transformResponse: (response) => response,
      invalidatesTags: ['MovieWatch'], 
    }),
    getMovieAccountStates: builder.query({
      query: (movieId) => {
        const state = store.getState();
        const sessionId = state.session.sessionId;
        if (!sessionId) {
          return { data: null }; 
        }
        return {
          url: `movie/${movieId}/account_states`,
          params: { api_key: API_KEY, session_id: sessionId }
        };
      },
      providesTags: ['MovieWatch', 'Account'],
    }),
  }),
});

export const { useGetMoviesQuery, 
  useFetchMovieQuery, 
  useFetchTokenQuery, 
  useLazyValidateTokenQuery,
   useLazyCreateSessionQuery, 
   useFetchWatchlistQuery,  
   useFetchDetailsQuery, 
   useAddToWatchlistMutation, 
   useGetMovieAccountStatesQuery, 
   useGetGenresQuery,
   useGetCountriesQuery,
   useGetRecommendationsQuery} = moviesApi;

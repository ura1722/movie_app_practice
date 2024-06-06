import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  }),
});

export const { useGetMoviesQuery, useFetchMovieQuery } = moviesApi;

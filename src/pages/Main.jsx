import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Movie from '../components/Movie';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const searchTerm = useSelector((state) => state.search);

  const URL_API = "https://api.themoviedb.org/3";
  const SEARCH = `${URL_API}/search/movie`;
  const DISCOVER = `${URL_API}/discover/movie`;
  const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API;

  const fetchMovies = async (pageNum = 1) => {
    const url = searchTerm ? SEARCH : DISCOVER;
    const params = {
      api_key: API_KEY,
      query: searchTerm,
      page: pageNum,
    };
    const { data: { results, total_results } } = await axios.get(url, { params });
    setMovies(prevMovies => [...prevMovies, ...results]);
    setTotalResults(total_results);
  };

  useEffect(() => {
    setMovies([]); 
    setPage(1); 
    fetchMovies(1);
  }, [searchTerm]);

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  return (
    <div className="container">
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <Movie movie={movie} />
          </div>
        ))}
      </div>
      {movies.length < totalResults && searchTerm && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mb-5" onClick={loadMoreMovies}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Main;

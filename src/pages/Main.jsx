import { useState, useEffect } from 'react';
import { useGetMoviesQuery} from '../services/moviesApi';
import { useSelector } from 'react-redux';
import Movie from '../components/Movie';


import Filter from '../components/Filter';

const Main = () => {

  
 
  const searchTerm = useSelector((state) => state.search);
 
  const [page, setPage] = useState(1);
  
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
 
  

  const [selectedGenres, setSelectedGenres] = useState([]);
  
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
  const [selectedCountry, setSelectedCountry] = useState('UA');

  const { data, error, isLoading } = useGetMoviesQuery({ query: searchTerm, page, genreIds: selectedGenres, sort_by: selectedSort,  with_origin_country: selectedCountry});
  


  const resetMovies = () => {
    setMovies([]);
    setPage(1);
  };

  useEffect(() => {
    if (searchTerm !== '' || selectedGenres.length > 0 || selectedSort !== 'popularity.desc') {
      resetMovies();
    }
  }, [searchTerm, selectedGenres, selectedSort]);

  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setTotalResults(data.totalResults);
    }
  }, [data]);

  const handleGenreSelect = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId) ? prevGenres.filter(id => id !== genreId) : [...prevGenres, genreId]
    );
    resetMovies();
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
    resetMovies();
  };
  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    resetMovies();
  };

  const loadMoreMovies = () => setPage((prevPage) => prevPage + 1);

  if (isLoading && movies.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="container">
     {searchTerm === '' ? (
        <Filter selectedGenres={selectedGenres} onGenreSelect={handleGenreSelect} selectedSort={selectedSort} onSortSelect={handleSortSelect} onCountrySelect={handleCountrySelect} />
      ) : (
        <h2 className='mb-4'>Результати пошуку за запитом &quot;{searchTerm}&quot;</h2>
      )}
      
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-12 custom-col col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <Movie
              movie={movie}
              
            />
          </div>
        ))}
      </div>

      {movies.length < totalResults && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mb-5" onClick={loadMoreMovies}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Main;

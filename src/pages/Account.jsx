import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchDetailsQuery, useFetchWatchlistQuery } from '../services/moviesApi';
import { setAccountId } from '../slices/sessionSlice';
import Movie from '../components/Movie';

const Account = () => {
  const dispatch = useDispatch();
  
  const { data: detailsData, error: detailsError, isLoading: detailsLoading, refetch: refetchDetails } = useFetchDetailsQuery();
  
  useEffect(() => {
    if (detailsData?.id) {
      dispatch(setAccountId(detailsData.id)); 
    }
  }, [detailsData, dispatch]);
 

  const { data: watchlistData, error: watchlistError, isLoading: watchlistLoading, refetch: refetchWatchlist} = useFetchWatchlistQuery();
  useEffect(() => {
    refetchDetails()
    refetchWatchlist();
}, [refetchWatchlist, refetchDetails]);
  if (detailsLoading || watchlistLoading) return <div>Loading...</div>;
  if (detailsError) return <div>Error occurred while fetching details: {detailsError.message}</div>;
  if (watchlistError) return <div>Error occurred while fetching watchlist: {watchlistError.message}</div>;

  return (
    <div>
      <h2>Watchlist</h2>
      <div className='row'>
        {watchlistData?.results.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
          <Movie
            movie={movie}
            //select={() => setSelectedMovieId(movie.id)}
          />
        </div>
        ))}
      </div>
    </div>
  );
};

export default Account;

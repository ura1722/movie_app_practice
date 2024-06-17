import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchDetailsQuery, useFetchWatchlistQuery } from '../services/moviesApi';
import { setAccountId } from '../slices/sessionSlice';
import Movie from '../components/Movie';

const Account = () => {
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.session.accountId);
  const { data: detailsData, error: detailsError, isLoading: detailsLoading } = useFetchDetailsQuery();
  
  useEffect(() => {
    if (detailsData?.id) {
      dispatch(setAccountId(detailsData.id)); 
      
    }
    
  }, [detailsData, dispatch]);
  useEffect(() => {
    if (accountId==null) {
      setTimeout(() => {
        window.location.reload();
        
      }, 300);
      
    }
    
  }, [accountId]);
 
  

  const { data: watchlistData, error: watchlistError, isLoading: watchlistLoading} = useFetchWatchlistQuery();

  if (detailsLoading || watchlistLoading) return <div>Loading...</div>;
  if (detailsError) return <div>Error occurred while fetching details: {detailsError.message}</div>;
  if (watchlistError) return <div>Error occurred while fetching watchlist: {watchlistError.message}</div>;

  return (
    <div>
      <h2>Watchlist</h2>
      <div className='row'>
        {watchlistData?.results.map((movie) => (
          <div key={movie.id} className="col-12  custom-col col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
          <Movie
            movie={movie}
            
          />
        </div>
        ))}
      </div>
    </div>
  );
};

export default Account;

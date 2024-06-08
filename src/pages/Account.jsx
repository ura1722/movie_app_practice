
import { useFetchDetailsQuery, useFetchWatchlistQuery } from '../services/moviesApi';


const Account = () => {
  
  
  const { data: detailsData, error: detailsError, isLoading: detailsLoading } = useFetchDetailsQuery();
  
  

  const { data: watchlistData, error: watchlistError, isLoading: watchlistLoading } = useFetchWatchlistQuery(detailsData?.id);

  if (detailsLoading || watchlistLoading) return <div>Loading...</div>;
  if (detailsError) return <div>Error occurred while fetching details: {detailsError.message}</div>;
  if (watchlistError) return <div>Error occurred while fetching watchlist: {watchlistError.message}</div>;

  return (
    <div>
      <h2>Watchlist</h2>
      <ul>
        {watchlistData?.results.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Account;

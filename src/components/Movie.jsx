
import Button from 'react-bootstrap/Button';
import NoImg from '../img/No_img.png';
import { useAddToWatchlistMutation, useGetMovieAccountStatesQuery } from '../services/moviesApi';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const Movie = ({ movie, select }) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w342";
  const [addToWatchlist] = useAddToWatchlistMutation();
  const { data: accountStates, error: accountStatesError, refetch: refetchAccountStates } = useGetMovieAccountStatesQuery(movie.id);

  const handleWatchlistToggle = async (movieId, isWatchlisted) => {
    try {
      await addToWatchlist({ mediaId: movieId, mediaType: 'movie', watchlist: !isWatchlisted }).unwrap();
      refetchAccountStates(); // Перезапитати стан облікового запису після додавання до watchlist
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };
  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), 'd MMMM yyyy', { locale: uk })
    : 'N/A';
  if (accountStatesError) return <div>Error occurred while fetching account states: {accountStatesError.message}</div>;

  
  return (
    <div className='card movie-card' style={{ cursor: 'pointer' }} onClick={() => select(movie)}>
      <div className={movie.poster_path ? '' : 'img_box d-flex align-items-center justify-content-center'}>
        {movie.poster_path ? (
          <img src={IMG_PATH + movie.poster_path} alt={movie.title} className="card-img" />
        ) : (
          <img src={NoImg} alt={movie.title} className="card-img_1" />
        )}
      </div>

      <div className='card-body d-flex flex-column justify-content-between'>
        <div>
          <p className='card-title'>{movie.title}</p>
          <p className='date'>{formattedDate}</p>
          
        </div>
        <Button
          onClick={() => handleWatchlistToggle(movie.id, accountStates?.watchlist)}
          variant={accountStates?.watchlist ? "secondary" : "outline-secondary"}
        >
          {accountStates?.watchlist ? "ДИВИВСЯ" : "ДОДАТИ"}
        </Button>
      </div>
    </div>
  );
};

export default Movie;

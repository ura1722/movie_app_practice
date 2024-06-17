
import Button from 'react-bootstrap/Button';
import NoImg from '../img/No_img.png';
import { useAddToWatchlistMutation, useGetMovieAccountStatesQuery } from '../services/moviesApi';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Movie = ({ movie }) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w342";
  const [addToWatchlist] = useAddToWatchlistMutation();
  const accountId = useSelector((state) => state.session.accountId);
  const { data: accountStates, error: accountStatesError} = useGetMovieAccountStatesQuery(movie.id);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const handleWatchlistToggle = async (movieId, isWatchlisted) => {
    try {
      if(accountId!=null){
        await addToWatchlist({ mediaId: movieId, mediaType: 'movie', watchlist: !isWatchlisted }).unwrap();
      }
      else{
        navigate('/movie_app_practice/auth')
      }
      
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };
  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), 'd MMMM yyyy', { locale: uk })
    : 'N/A';
  if (accountStatesError) return <div>Error occurred while fetching account states: {accountStatesError.message}</div>;
  

  const handleClick = () => {
   
    navigate(`/movie_app_practice/movies/${movie.id}`);
  };
  
  return (
    <div className={`card movie-card ${theme}`} style={{ cursor: 'pointer' }} >
      <div onClick={handleClick} className={movie.poster_path ? '' : 'img_box d-flex align-items-center justify-content-center'}>
        {movie.poster_path ? (
          <img src={IMG_PATH + movie.poster_path} alt={movie.title} className="card-img" />
        ) : (
          <img src={NoImg} alt={movie.title} className="card-img_1" />
        )}
      </div>

      <div className='card-body d-flex flex-column justify-content-between'>
        <div>
          <p className='mb-0'>{"Оцінка: "+movie.vote_average}</p>
          <p className='card-title movie-title'>{movie.title}</p>
          <p className='date mb-0'>{formattedDate}</p>
          
        </div>
        <Button
        className='mb-2'
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

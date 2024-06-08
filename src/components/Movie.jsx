import Button from 'react-bootstrap/Button';
import NoImg from '../img/No_img.png';


const Movie = ({ movie , select}) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w342";
  
  return (
    <div className='card movie-card' style={{ cursor: 'pointer' }} onClick={()=> select(movie)}>
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
          <p className='date'>{movie.release_date}</p>
        </div>
        <Button variant="outline-secondary">WATCHLIST</Button>
      </div>
    </div>
  );
};

export default Movie;

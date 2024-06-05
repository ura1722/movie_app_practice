import Button from 'react-bootstrap/Button';
const Movie = ({ movie }) => {
    const IMG_PATH = "https://image.tmdb.org/t/p/w342"
    return (
      <div className='card movie-card ' style={{ cursor: 'pointer' }}>
        {movie.poster_path &&
          <img src={IMG_PATH + movie.poster_path} alt={movie.title} className="card-img-top" />
        }
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

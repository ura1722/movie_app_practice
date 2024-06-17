import { useParams } from 'react-router-dom';
import { useFetchMovieQuery, useGetRecommendationsQuery , useGetMovieAccountStatesQuery, useAddToWatchlistMutation} from '../services/moviesApi';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Youtube from 'react-youtube';

import countries from '../components/countries';
import Movie from '../components/Movie';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { uk } from 'date-fns/locale';

const Details = () => {
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  
  const [movies, setMovies] = useState([]);
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
  const POSTER_PATH = "https://image.tmdb.org/t/p/w342";
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({});

  const { data: movieData } = useFetchMovieQuery(id, { skip: !id });
  const { data: moviesData } = useGetRecommendationsQuery(id, { skip: !id });
  const theme = useSelector((state) => state.theme.theme);
  const [addToWatchlist] = useAddToWatchlistMutation();
  const { data: accountStates, refetch: refetchAccountStates } = useGetMovieAccountStatesQuery(id);
  const localizedCountries = movie.production_countries
    ? movie.production_countries
        .map(country => countries[country.iso_3166_1] || country.name)
        .join(', ')
    : 'Невідомо';

  useEffect(() => {
    setMovies([]);
    if (moviesData?.results) {
      setMovies(prevMovies => [...prevMovies, ...moviesData.results]);
    }
  }, [moviesData]);

  useEffect(() => {
    setPlaying(false);
    if (movieData) {
      setMovie(movieData);
      if (movieData.videos && movieData.videos.results) {
        const officialTrailer = movieData.videos.results.find(vid => vid.name === "Official Trailer");
        setTrailer(officialTrailer ? officialTrailer : movieData.videos.results[0]);
      }
    }
  }, [movieData]);

  const handleWatchlistToggle = async (movieId, isWatchlisted) => {
    try {
      await addToWatchlist({ mediaId: movieId, mediaType: 'movie', watchlist: !isWatchlisted }).unwrap();
      refetchAccountStates(); 
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };

  const formattedDate = movie.release_date
  ? format(new Date(movie.release_date), 'd MMMM yyyy', { locale: uk })
  : 'N/A';

  const renderActorsCarousel = () => {
    if (!movie.credits || !movie.credits.cast) return null;

    
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <Slider {...settings}>
        {movie.credits.cast.map(actor => (
          <div  key={actor.cast_id}>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
            <div className="">
              <h3>{actor.name}</h3>
              <p>{actor.character}</p>
            </div>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <div className='container'>
      {movie ? (
        <div className='selected d-flex align-items-end text-bg-secondary pb-4 mb-4 w-100' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
          <div className="content mx-5 w-100 " >
            {playing ? (
              <>
                {trailer && (
                  <div className="youtube-container">
                    <Youtube
                      videoId={trailer.key}
                      className={"youtube"}
                      containerClassName={"youtube-container"}
                      opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                  </div>
                )}
                <Button variant="outline-light" onClick={() => setPlaying(false)}>Close</Button>
              </>
            ) : (
              <div>
                <Button variant="outline-light" onClick={() => setPlaying(true)}>WATCH</Button>
                <h2>{movie.title}</h2>
                <p className='country'>{localizedCountries}</p>
                <p>{movie.overview ? movie.overview : null}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}

<div className="row my-4">
        <div className="d-flex flex-column align-items-center col-md-4">
          <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} className="img-fluid rounded" />
          <Button
          className='px-5'
          onClick={() => handleWatchlistToggle(movie.id, accountStates?.watchlist)}
          variant={accountStates?.watchlist ? "secondary" : "outline-secondary"}
        >
          {accountStates?.watchlist ? "ДИВИВСЯ" : "ДОДАТИ"}
        </Button>
        </div>
        <div className="col-md-8">
          <Table striped bordered hover variant={`${theme === 'dark' ? 'dark' : 'light'}`}>
            <tbody>
              <tr>
                <td><strong>Рейтинг</strong></td>
                <td>{movie.vote_average}</td>
              </tr>
              <tr>
                <td><strong>Дата релізу</strong></td>
                <td>{movie.release_date ? formattedDate : 'Невідомо'}</td>
              </tr>
              <tr>
                <td><strong>Слоган</strong></td>
                <td>{movie.tagline ? movie.tagline : 'Невідомо'}</td>
              </tr>
              <tr>
                <td><strong>Країни</strong></td>
                <td>{localizedCountries}</td>
              </tr>
              <tr>
                <td><strong>Режисер</strong></td>
                <td>{movie.credits && movie.credits.crew ? movie.credits.crew.find(member => member.job === 'Director').name : 'Невідомо'}</td>
              </tr>
              <tr>
                <td><strong>Жанр</strong></td>
                <td>{movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'Невідомо'}</td>
              </tr>
              <tr>
                <td><strong>Тривалість</strong></td>
                <td>{movie.
runtime
 ? movie.
 runtime
 +'хв. ' : 'Невідомо'}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <h2>Актори</h2>
      <div className="row">
        <div className="col">
          {renderActorsCarousel()}
        </div>
      </div>
      <h2>Із цієї серії</h2>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-12 custom-col col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <Movie
              movie={movie}
              isChecked = {true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;

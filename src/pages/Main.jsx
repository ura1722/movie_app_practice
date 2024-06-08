import { useState, useEffect } from 'react';
import { useGetMoviesQuery, useFetchMovieQuery } from '../services/moviesApi';
import { useSelector } from 'react-redux';
import Movie from '../components/Movie';
import Button from 'react-bootstrap/Button';
import Youtube from 'react-youtube';


const Main = () => {


  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
  const searchTerm = useSelector((state) => state.search);
  const [playing, setPlaying] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState(null);

  const { data, error, isLoading } = useGetMoviesQuery({ query: searchTerm, page });
  const { data: movieData } = useFetchMovieQuery(selectedMovieId, { skip: !selectedMovieId });

  useEffect(() => {
    setMovies([]);
    setPage(1);
    
  }, [searchTerm]);

  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setTotalResults(data.totalResults);
      if (page === 1 && data.results.length > 0) {
        const firstMovie = data.results[0];
        setMovie(firstMovie);
        setSelectedMovieId(firstMovie.id);
      }
    }
  }, [data]);

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

  const loadMoreMovies = () => setPage((prevPage) => prevPage + 1);

  if (isLoading && movies.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="container">
      {movie ? (
        <div className='selected d-flex align-items-end text-bg-secondary pb-4 mb-4 w-100' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
          <div className="content mx-5 w-100">
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
                <Button variant="outline-light" onClick={() => setPlaying(false)} className={"button close-video"}>Close</Button>
              </>
            ) : (
              <div>
                <Button variant="outline-light" onClick={() => setPlaying(true)}>WATCH</Button>
                <h2>{movie.title}</h2>
                <p>{movie.overview ? movie.overview : null}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <Movie
              movie={movie}
              select={() => setSelectedMovieId(movie.id)}
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

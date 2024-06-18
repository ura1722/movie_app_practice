import { useState } from 'react';
import { useGetGenresQuery, useGetCountriesQuery } from '../services/moviesApi';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

const Filter = ({ selectedGenres = [], onGenreSelect, onSortSelect, onCountrySelect  }) => {
  const { data: genresData, isLoading, error } = useGetGenresQuery();
  const { data: countriesData} = useGetCountriesQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("Сортування");
  const [country, setCountry] = useState("Країни");
  const theme = useSelector((state) => state.theme.theme);
  
  
  const handleCheckboxChange = (event) => {
    const genreId = parseInt(event.target.value, 10);
    onGenreSelect(genreId);
    setIsDropdownOpen(true)
  };

  const handleSortSelect = (sortOption, event) => {
    onSortSelect(sortOption);
    setSortLabel(event.target.textContent);
  };
  const handleCountryChange = (Option, event) => {
   
    
    onCountrySelect(Option); 
    setCountry(event.target.textContent);
  };

  if (isLoading) return <div>Loading genres...</div>;
  if (error) return <div>Error loading genres: {error.message}</div>;

  return (
    <div className='d-flex flex-wrap'>
      
      <Dropdown show={isDropdownOpen} onToggle={setIsDropdownOpen}>
        <Dropdown.Toggle variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} id="dropdownMenuButton">
          Вибір жанрів
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {genresData.genres.map((genre) => (
            <Dropdown.Item key={genre.id}>
              <Form.Check
                type="checkbox"
                label={genre.name}
                value={genre.id}
                checked={selectedGenres.includes(genre.id)}
                onChange={handleCheckboxChange}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSortSelect}>
        <Dropdown.Toggle variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} id="dropdownSortButton">
          {sortLabel}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="popularity.desc">Популярні</Dropdown.Item>
          <Dropdown.Item eventKey="release_date.desc">Останні</Dropdown.Item>
          <Dropdown.Item eventKey="title.asc">Від А-Я</Dropdown.Item>
          <Dropdown.Item eventKey="title.desc">Від Я-А</Dropdown.Item>
          <Dropdown.Item eventKey="vote_average.asc">Рейтинг (Від меншого)</Dropdown.Item>
          <Dropdown.Item eventKey="vote_average.desc">Рейтинг (Від більшого)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleCountryChange}>
        <Dropdown.Toggle variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} id="dropdownMenuButton">
          {country}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {countriesData?.map((country) => (
            <Dropdown.Item key={country.iso_3166_1} eventKey={country.iso_3166_1}>
              
              
                
                
                
                
              {country.native_name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Filter;

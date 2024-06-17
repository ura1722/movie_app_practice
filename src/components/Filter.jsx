import { useState } from 'react';
import { useGetGenresQuery } from '../services/moviesApi';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const Filter = ({ selectedGenres = [], onGenreSelect, onSortSelect }) => {
  const { data: genresData, isLoading, error } = useGetGenresQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("Сортування");

  const handleCheckboxChange = (event) => {
    const genreId = parseInt(event.target.value, 10);
    onGenreSelect(genreId);
    setIsDropdownOpen(true)
  };

  const handleSortSelect = (sortOption, event) => {
    onSortSelect(sortOption);
    setSortLabel(event.target.textContent);
  };

  if (isLoading) return <div>Loading genres...</div>;
  if (error) return <div>Error loading genres: {error.message}</div>;

  return (
    <div className='d-flex flex-wrap'>
      
      <Dropdown show={isDropdownOpen} onToggle={setIsDropdownOpen}>
        <Dropdown.Toggle variant="outline-light" id="dropdownMenuButton">
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
        <Dropdown.Toggle variant="outline-light" id="dropdownSortButton">
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
    </div>
  );
};

export default Filter;

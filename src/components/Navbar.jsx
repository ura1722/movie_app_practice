
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../slices/searchSlice';
import { toggleTheme } from '../slices/themeSlice';
import Form from 'react-bootstrap/Form';

const Navbar = () => {
  const dispatch = useDispatch();
 
  const theme = useSelector((state) => state.theme.theme);
  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    dispatch(setSearchTerm(searchTerm));
  };
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className='mb-3'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand" to="/movie_app_practice">MovieApp</Link>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/movie_app_practice">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movie_app_practice/auth">Login</Link>
            </li>
          </ul>
          <div className="form-check form-switch ms-5 mb-0 pb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={theme === 'dark'}
              onChange={handleToggleTheme}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
          <div className="d-flex justify-content-center flex-grow-1">
            <Form onSubmit={handleSearch} className="d-flex w-50">
              <Form.Control
                type="text"
                placeholder="Search"
                name="search"
                className="mr-2 w-100"
              />
              
            </Form>
          </div>
          <Link className="nav-link" to="/movie_app_practice/myaccount">Account</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

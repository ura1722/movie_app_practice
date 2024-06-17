import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../slices/searchSlice';
import { toggleTheme } from '../slices/themeSlice';
import { clearSessionId } from '../slices/sessionSlice'; 
import { clearAccountId } from '../slices/sessionSlice'; 
import Form from 'react-bootstrap/Form';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const sessionId = useSelector((state) => state.session.sessionId);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    dispatch(setSearchTerm(searchTerm));
    navigate("/movie_app_practice");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(clearSessionId()); 
    dispatch(clearAccountId())
    navigate("/movie_app_practice");
    window.location.reload();
  };

  return (
    <div className='navbar_ mb-3'>
      <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand" to="/movie_app_practice">MovieApp</Link>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/movie_app_practice">Головна</Link>
            </li>
            {sessionId ? (
              <li className="nav-item">
                <button className=" m-0 nav-link btn btn-link" onClick={handleLogout}>Вийти</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/movie_app_practice/auth">Ввійти</Link>
              </li>
            )}
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
              {theme === 'dark' ? 'Темна Тема' : 'Світла Тема'}
            </label>
          </div>

          <div className="d-flex justify-content-center flex-grow-1">
            <Form onSubmit={handleSearch} className="d-flex w-50">
              <Form.Control
                type="text"
                placeholder="Search"
                name="search"
                className={`mr-2 w-100 ${theme}`}
              />
            </Form>
          </div>
          {sessionId ?(
            <Link className="nav-link" to="/movie_app_practice/myaccount">Акаунт</Link>
          )
          :(
            null
          )
          }
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

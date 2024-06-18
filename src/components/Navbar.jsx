import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../slices/searchSlice';
import { toggleTheme } from '../slices/themeSlice';
import { clearSessionId, clearAccountId } from '../slices/sessionSlice'; 
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const sessionId = useSelector((state) => state.session.sessionId);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    dispatch(setSearchTerm(searchTerm));
    navigate("/");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(clearSessionId()); 
    dispatch(clearAccountId());
    navigate("/");
    window.location.reload();
  };

  return (
    <div className='navbar_ mb-3'>
      <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/movie_app_practice">MovieApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex flex-column justify-content-center">
                <Link className="nav-link" to="/">Головна</Link>
              </li>
              {sessionId ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Вийти</button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/movie_app_practice/auth">Ввійти</Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              <div className="form-check form-switch me-3">
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
              <Form onSubmit={handleSearch} className="d-flex me-3">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  name="search"
                  className={`mr-2 ${theme}`}
                />
              </Form>
              {sessionId && (
                <Link className="nav-link" to="/movie_app_practice/myaccount">Акаунт</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../slices/searchSlice';

import Form from 'react-bootstrap/Form';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    dispatch(setSearchTerm(searchTerm));
  };

  return (
    <div className='mb-3'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand" to="/">MovieApp</Link>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth">Login</Link>
            </li>
          </ul>
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
          <Link className="nav-link" to="/myaccount">Account</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

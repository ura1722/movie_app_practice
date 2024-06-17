
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Navbar from './components/Navbar'
import Account from './pages/Account';
import { useSelector } from 'react-redux';
import Details from './pages/Details';



function App() {

  const theme = useSelector((state) => state.theme.theme);

  
  return (
    <Router>
      <div className={`app ${theme}`}>
      <div className='container'>
      
        
          <Navbar/>
          <Routes>
            <Route path="/movie_app_practice" element={<Main />} />
            <Route path="/movie_app_practice/auth" element={<Auth />} />
            <Route path="/movie_app_practice/myaccount" element={<Account />} />
            <Route path="/movie_app_practice/movies/:id" element={<Details />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

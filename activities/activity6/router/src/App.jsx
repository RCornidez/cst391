import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import AboutThisSite from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LoginPage from './pages/Login';
import User from './pages/User';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import './App.css'

const RootElement = () => <span></span>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (from, navigate) => {
    setIsLoggedIn(true);
    navigate(from, {replace: true});
  };

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<RootElement />}/>
          <Route path='/about' element={<PrivateRoute authorized={isLoggedIn}><AboutThisSite/></PrivateRoute>}/>
          <Route path='/contact' element={<PrivateRoute authorized={isLoggedIn}><ContactUs/></PrivateRoute>}/>
          <Route path='/user/:username' element={<User/>}/>
          <Route path='/login' element={<LoginPage onClick={handleLogin}/>}/>
        </Routes>

        <h5>Some friends of mine</h5>
        <ul>
          <li>
            <Link to="user/Mary">Mary</Link>
          </li>
          <li>
            <Link to="user/Justin">Justin</Link>
          </li>
        </ul>
      </BrowserRouter>
    </>
  )
}

export default App

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import CountryDropdown from '../CountryDropdown';
import { FaUser } from "react-icons/fa";
import { IoBagOutline } from 'react-icons/io5';
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { MyContext } from '../../App';
import React, { useContext, useState } from 'react';

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    // Clear user session data (localStorage, cookies, etc.)
    localStorage.removeItem('token'); // Example for token
    // You can also clear cookies or other storage mechanisms if needed

    // Redirect to home and reload
    navigate('/'); // Redirect to home page
    window.location.reload(); // Force a full page reload
  };

  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              "Here <b>SCIENCE</b> Meets <b>QUALITY"</b>
            </p>
          </div>
        </div>
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-1">
                <Link to={'/'}>
                  <img src={Logo} alt='Logo' />
                </Link>
              </div>
              <div className='col-sm-10 d-flex align-items-center part2'>
                {context.countryList.length !== 0 && <CountryDropdown />}
                <SearchBox />
                <div className='part3 d-flex align-items-center '>
                  <div className="profile-menu">
                    <Button className='circle mr-3' onClick={() => setShowLogout(!showLogout)}>
                      <FaUser />
                    </Button>
                    {showLogout && (
                      <div className="logout-dropdown">
                        <Button variant="text" onClick={handleLogout}>Logout</Button>
                      </div>
                    )}
                  </div>
                  <div className='ml-auto cartTab'>
                    <Button className='circle' onClick={handleNavigateToCart}>
                      <IoBagOutline />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Navigation />
      </div>
    </>
  );
};

export default Header;

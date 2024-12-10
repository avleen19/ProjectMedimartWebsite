import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);

  return (
    <nav>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-2 navPart1'>
            <div className='catWrapper'>
              <Button 
                className='allCatTab align-items-center' 
                onClick={() => setIsOpenSidebarVal(!isOpenSidebarVal)}
              >
                <span className='icon1'><IoIosMenu /></span>
                <span className="text">ALL CATEGORIES</span>
                <span className='icon2'><FaAngleDown /></span>
              </Button>
              <div className={`sidebarNav ${isOpenSidebarVal ? 'open' : ''}`}>
                <ul>
                  <li><Link to='/products/1'><Button>Glassware</Button></Link></li>
                  <li><Link to='/products/2'><Button>Plasticware</Button></Link></li>
                  <li><Link to='/products/3'><Button>Lab equipments</Button></Link></li>
                  <li><Link to='/products/4'><Button>Medical equipments</Button></Link></li>
                  <li><Link to='/products/5'><Button>Surgical equipments</Button></Link></li>
                  <li><Link to='/products/6'><Button>Emergency equipments</Button></Link></li>
                  <li><Link to='/products/7'><Button>Accessories and Parts</Button></Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className='col-sm-10 navPart2 d-flex align-items-center'>
            <ul className='list list-inline ml-auto'>
              <li className='list-inline-item'>
                <Link to="/">HOME</Link>
              </li>
              <li className='list-inline-item'>
                <Link to="/AboutUs">ABOUT US</Link> 
              </li>
              <li className='list-inline-item'>
                <Link to="/products">PRODUCTS</Link> 
              </li>
              <li className='list-inline-item'>
                <Link to="/ContactUs">CONTACT US</Link> 
              </li>
              <li className='list-inline-item'>
                <Link to="/Certifications">CERTIFICATIONS</Link> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

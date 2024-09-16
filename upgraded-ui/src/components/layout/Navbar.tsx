import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { GoPerson } from 'react-icons/go';

interface NavbarProps {
  isNetwork: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isNetwork }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className='navBar'>
      <div className='module1'>
        <a
          href='https://www.ccma.cat/tv3/marato/'
          className='logoInstitution'
          target='_blank'
          rel='noreferrer'
        >
          <img
            className='la-marato-logo'
            src='../la-marato-logo.png'
            alt='la-marato-logo'
          ></img>
        </a>
        <h1 className='beacon-title'>Beacon Network</h1>
      </div>
      <div className='module2'>
        <div className={`home ${isActive('/') ? 'active' : ''}`}>
          <Link to='/'>Home</Link>
        </div>
        <div className={`network-members ${isActive('/network-members') ? 'active' : ''}`}>
          <Link to='/network-members'>{isNetwork ? 'Network Members' : 'Beacon Info'}</Link>
        </div>
        <div className={`about ${isActive('/about') ? 'active' : ''}`}>
          <Link to='/about'>About</Link>
        </div>
        <div className={`contact ${isActive('/contact') ? 'active' : ''}`}>
          <Link to='/contact'>Contact</Link>
        </div>
        <div className={`log-in ${isActive('/log-in') ? 'active' : ''}`}>
          <Link to='/log-in'>
            <GoPerson />
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

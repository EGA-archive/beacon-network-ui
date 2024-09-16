import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

interface FooterProps {
  isNetwork: boolean;
}

const Footer: React.FC<FooterProps> = ({ isNetwork }) => {
  return (
    <footer className='footer'>
      <p>&copy; Copyright Beacon Network Searcher</p>
      <div className='footer-container'>
        <Link to='/network-members'>
          <h1>{isNetwork ? 'Network Members' : 'Beacon Info'}</h1>
        </Link>
        <Link to='/about'>
          <h1>About</h1>
        </Link>
        <Link to='/contact'>
          <h1>Contact</h1>
        </Link>
        <Link to='log-in'>
          <h1>Log in</h1>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
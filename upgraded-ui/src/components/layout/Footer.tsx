import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <p>&copy; Copyright Beacon Network Searcher</p>
      <div className='footer-container'>
        <Link to='/network-members'>
          <h1>Network Members</h1>
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
  )
}

export default Footer

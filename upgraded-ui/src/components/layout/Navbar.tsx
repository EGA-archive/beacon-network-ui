import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import configData from './../../config.json'
import './Navbar.css'
import { GoPerson } from 'react-icons/go'

const Navbar = () => {
  const [isNetwork, setIsNetwork] = useState(false)

  useEffect(() => {
    const apiCall = async () => {
      try {
        let res = await axios.get(configData.API_URL + '/info')

        if (res.data.meta.isAggregated) {
          setIsNetwork(true)
        }
      } catch (error) {}
    }

    apiCall()
  }, [])

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
        <h1 className='beacon-title'>Beacon network</h1>
      </div>
      <div className='module2'>
        <div className='home'>
          <Link to='/'>Home</Link>
        </div>
        <div className='network-members'>
          <Link to='/network-members'>Network members</Link>
        </div>
        <div className='about'>
          <Link to='/about'>About</Link>
        </div>
        <div className='contact'>
          <Link to='/contact'>Contact</Link>
        </div>
        <div className='log-in'>
          <Link to='/log-in'>
            <GoPerson />
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

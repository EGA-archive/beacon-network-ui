import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import FilterBox from './components/forms/FilterBox'
import StateBeacons from './components/forms/StateBecons'
import Footer from './components/layout/Footer'
import './App.css'

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className='funding-div'>
        <div className='funding-content'>
          <div className='logos'>
            <a
              href='https://www.ccma.cat/tv3/marato/'
              className='logoInstitution'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='la-marato-logo-grey'
                src='../lamarato-logo-grey.png'
                alt='laMaratoLogo'
              ></img>
            </a>
            <a
              href='https://ics.gencat.cat/ca/lics/index.html'
              className='logoInstitution'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='ICS-logo'
                src='../ICS-logo-grey.png'
                alt='ICSLogo'
              ></img>
            </a>
            <a
              href='https://fundacionlacaixa.org/es/'
              className='logoInstitution'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='caixa-logo'
                src='../caixa-logo-grey.png'
                alt='caixaLogo'
              ></img>
            </a>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='content-container'>
          <FilterBox />
          <div className='search-members-container'>
            <div className='search-box'>
              <h2>Search</h2>
            </div>
            <div className='members-box'>
              <h2>Beacon Network Members</h2>
              <StateBeacons />
            </div>
          </div>
        </div>

        <Routes>
          <Route path='/' element={<div></div>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App

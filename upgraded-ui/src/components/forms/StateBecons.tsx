import React from 'react'
import './StateBeacons.css'
import { TbPointFilled } from 'react-icons/tb'

interface Icon {
  src: string
  alt: string
}

const icons: Icon[] = [
  { src: 'ega-logo.png', alt: 'EGA' },
  { src: 'sant-pau.png', alt: 'Sant Pau' },
  { src: 'sjd.png', alt: 'SJD' },
  { src: 'vall-hebron.png', alt: 'Vall Hebron' },
  { src: 'clinic.png', alt: 'Clinic' }
  // Add more icons as needed
]

const StateBeacons: React.FC = () => {
  return (
    <div className='state-beacons'>
      {icons.map((icon, index) => (
        <div key={index} className='icon-container'>
          <TbPointFilled/>
          <img
            src={process.env.PUBLIC_URL + '/' + icon.src}
            alt={icon.alt}
            className={`icon-state ${icon.alt === 'SJD' ? 'small-icon' : ''}`}
          />
        </div>
      ))}
    </div>
  )
}

export default StateBeacons

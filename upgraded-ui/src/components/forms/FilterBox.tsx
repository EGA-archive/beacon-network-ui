import React, { useState } from 'react'
import './FilterBox.css'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from 'react-icons/io'
import { TbFilterSearch } from 'react-icons/tb'

interface OpenSections {
  [key: string]: boolean
}

const FilterBox: React.FC = () => {
  const [openSections, setOpenSections] = useState<OpenSections>({})

  const toggleSection = (section: string) => {
    setOpenSections(prevOpenSections => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section]
    }))
  }

  return (
    <div className='filter-box'>
      <h2>Examples</h2>
      <h3>Accepted variant annotations</h3>
      <ul>
        {[
          'Demographics',
          'SNV Examples',
          'CNV Examples',
          'Protein Examples',
          'Clinical Diagnosis'
        ].map(term => (
          <React.Fragment key={term}>
            <li onClick={() => toggleSection(term)}>
              {term}{' '}
              <span className={openSections[term] ? 'icon open' : 'icon'}>
                {openSections[term] ? (
                  <IoIosArrowDown className='open-icon' />
                ) : (
                  <IoIosArrowForward className='closed-icon' />
                )}
              </span>
            </li>
            {openSections[term] && term === 'Demographics' && (
              <li>
                <div className='term-details'>
                  {['Female', 'Male', 'Neonatal', 'Adult'].map(tag => (
                    <span className='tag' key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            )}
            {openSections[term] && term === 'SNV Examples' && (
              <li>
                <div className='term-details'>
                  {['TP53 : 7661960T>C', 'NC_000023.10 : 33038255C>A'].map(
                    tag => (
                      <span className='tag-variant' key={tag}>
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </li>
            )}
            {openSections[term] && term === 'CNV Examples' && (
              <li>
                <div className='term-details'>
                  {[
                    'MSK1 : 7572837_7578641del',
                    'NC_000001.11 : 1234del',
                    'NC_000001.11 : 1234_2345dup',
                    'NC_000001.11 : [ 5000000, 7676592 ] : [ 7669607, 10000000 ] : del'
                  ].map(tag => (
                    <span className='tag-variant' key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            )}
            {openSections[term] && term === 'Protein Examples' && (
              <li>
                <div className='term-details'>
                  {['TP53 : p.Tyr285Cys', 'NP_003997.1:p.Trp24Cys'].map(tag => (
                    <span className='tag-variant' key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            )}
            {openSections[term] && term === 'Clinical Diagnosis' && (
              <li>
                <div className='term-details'>
                  {['Ventricular hypertrophy', 'Ischemic heart disease', 'Amyloid heart disease'].map(tag => (
                    <span className='tag' key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
      <button className='filter-button'>
        <TbFilterSearch className='icon-filtering-terms' />
        All filtering terms
      </button>
    </div>
  )
}

export default FilterBox

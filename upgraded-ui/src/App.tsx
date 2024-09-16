import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FilterBox from './components/forms/FilterBox';
import StateBeacons from './components/forms/StateBecons';
import Footer from './components/layout/Footer';
import './App.css';
import SearchModule from './components/forms/SearchModule';
import FilteringTerms from './components/forms/FilteringTerms';
import AfterSearchModule from './components/forms/AfterSearchModule'; // Import AfterSearchModule
import Modal from './components/forms/Modal'; // Import Modal
import axios from 'axios';
import configData from './config.json';

interface FilteringTerm {
  id: string;
  label?: string;
}

const App: React.FC = () => {
  const [isNetwork, setIsNetwork] = useState(false); // Track if it is a network or beacon
  const [showFilteringTerms, setShowFilteringTerms] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilteringTerm[]>([]);
  const [idsToSearch, setIdsToSearch] = useState<string[]>([]);
  const [genomicParametersToSearch, setGenomicParametersToSearch] = useState<
    string[]
  >([]);
  const [predefinedGenomicTerm, setPredefinedGenomicTerm] = useState<
    string | null
  >(null);
  const [predefinedFilteringTerm, setPredefinedFilteringTerm] = useState<
    string | null
  >(null);
  const [showModal, setShowModal] = useState(false); // For showing modal
  const [filteringTerms, setFilteringTerms] = useState<FilteringTerm[]>([]); // Store filtering terms from the API

  // Fetch filtering terms and check if it's network or beacon when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteringRes = await axios.get(configData.API_URL + '/filtering_terms');
        setFilteringTerms(filteringRes.data.response.filteringTerms);

        const infoRes = await axios.get(configData.API_URL + '/info');
        if (infoRes.data.meta.isAggregated) {
          setIsNetwork(true); // Set the flag to true if it's a network
        } else {
          setIsNetwork(false); // Otherwise, it's a beacon
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleShowFilteringTerms = () => {
    setShowFilteringTerms(true); // Show FilteringTerms component
  };

  const resetPredefinedTerms = () => {
    setPredefinedGenomicTerm(null);
    setPredefinedFilteringTerm(null);
  };

  // Handler to add a term
  const handleAddTerm = (id: string, label: string) => {
    if (!idsToSearch.includes(id)) {
      setAppliedFilters((prev) => [...prev, { id, label }]); // Add new term to applied filters
      setIdsToSearch((prev) => [...prev, id]); // Add ID to idsToSearch
    }
  };

  // Handler to remove a term
  const handleRemoveTerm = (id: string) => {
    setAppliedFilters((prev) => prev.filter((term) => term.id !== id)); // Remove term from applied filters
    setIdsToSearch((prev) => prev.filter((termId) => termId !== id)); // Remove ID from idsToSearch
  };

  // Handler to clear all terms
  const handleClearAll = () => {
    setAppliedFilters([]); // Clear all applied filters
    setIdsToSearch([]); // Clear all IDs in idsToSearch
    setGenomicParametersToSearch([]);
  };

  // Handler to show search modal
  const handleSearch = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  // Handler to handle predefined terms from FilterBox
  const handleAddPredefinedTerm = (
    term: string,
    type: 'genomic' | 'filtering'
  ) => {
    if (type === 'genomic') {
      setPredefinedGenomicTerm(term); // Set term in the genomic query
    } else {
      setPredefinedFilteringTerm(term); // Set term in the filtering query
    }
  };

  return (
    <div>
      <Navbar isNetwork={isNetwork} /> {/* Pass isNetwork prop */}
      <div className='funding-div'>
        <div className='funding-content'>
          <div className='logos'>
            {/* Logos for La Marató, ICS, and Fundación La Caixa */}
            <a
              href='https://www.ccma.cat/tv3/marato/'
              className='logoInstitution'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='la-marato-logo-grey'
                src='../lamarato-logo-grey.png'
                alt='La Marató Logo'
              />
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
                alt='ICS Logo'
              />
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
                alt='Fundación La Caixa Logo'
              />
            </a>
          </div>
        </div>
      </div>

      <div className='content'>
        <div className='content-container'>
          <FilterBox
            showFilteringTerms={handleShowFilteringTerms}
            addPredefinedTerm={handleAddPredefinedTerm} // Add handler for predefined terms
          />
          <div className='search-members-container'>
            <div className='search-box'>
              <h2>Search</h2>
              <SearchModule
                appliedFilters={appliedFilters}
                idsToSearch={idsToSearch}
                setGenomicParametersToSearch={setGenomicParametersToSearch}
                genomicParametersToSearch={genomicParametersToSearch}
                addFilterTerm={handleAddTerm}
                removeFilterTerm={handleRemoveTerm}
                clearAllFilters={handleClearAll}
                predefinedGenomicTerm={predefinedGenomicTerm || ''}
                predefinedFilteringTerm={predefinedFilteringTerm || ''}
                resetPredefinedTerms={resetPredefinedTerms}
                onSearch={handleSearch} // Trigger search modal
              />
            </div>
            {!showFilteringTerms && (
              <div className='members-box'>
                <h2>{isNetwork ? 'Network Members' : 'Beacon Info'}</h2> {/* Dynamic heading */}
                <StateBeacons isNetwork={isNetwork} />
              </div>
            )}
            {showFilteringTerms && (
              <div className='filtering-terms-box'>
                <FilteringTerms
                  selectedTerms={idsToSearch}
                  onAddTerm={handleAddTerm}
                  onRemoveTerm={handleRemoveTerm}
                />
              </div>
            )}
          </div>
        </div>

        <Routes>
          <Route path='/' element={<div></div>} />
        </Routes>
      </div>
      <Footer isNetwork={isNetwork} /> {/* Pass isNetwork prop */}
      {/* Render the Modal */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <AfterSearchModule
            idsToSearch={idsToSearch}
            genomicParametersToSearch={genomicParametersToSearch}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;

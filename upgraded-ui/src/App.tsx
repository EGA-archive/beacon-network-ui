import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FilterBox from './components/forms/FilterBox';
import StateBeacons from './components/forms/StateBecons';
import Footer from './components/layout/Footer';
import './App.css';
import SearchModule from './components/forms/SearchModule';
import FilteringTerms from './components/forms/FilteringTerms';
import axios from 'axios';

interface FilteringTerm {
  id: string;
  label?: string;
}

const App: React.FC = () => {
  const [showFilteringTerms, setShowFilteringTerms] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilteringTerm[]>([]); // Store applied filters
  const [idsToSearch, setIdsToSearch] = useState<string[]>([]); // Store selected term IDs
  const [filteringTerms, setFilteringTerms] = useState<FilteringTerm[]>([]); // Store filtering terms from the API
  const [genomicParametersToSearch, setGenomicParametersToSearch] = useState<string[]>([]);
  const [predefinedGenomicTerm, setPredefinedGenomicTerm] = useState<string | null>(null);
  const [predefinedFilteringTerm, setPredefinedFilteringTerm] = useState<string | null>(null);

  // Fetch filtering terms when component mounts
  useEffect(() => {
    const fetchFilteringTerms = async () => {
      try {
        const res = await axios.get('https://beacon-network-backend-test.ega-archive.org/beacon-network/v2.0.0/filtering_terms');
        setFilteringTerms(res.data.response.filteringTerms);
      } catch (error) {
        console.error('Error fetching filtering terms:', error);
      }
    };
    fetchFilteringTerms();
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
      setAppliedFilters(prev => [...prev, { id, label }]); // Add new term to applied filters
      setIdsToSearch(prev => [...prev, id]); // Add ID to idsToSearch
    }
  };

  // Handler to remove a term
  const handleRemoveTerm = (id: string) => {
    setAppliedFilters(prev => prev.filter(term => term.id !== id)); // Remove term from applied filters
    setIdsToSearch(prev => prev.filter(termId => termId !== id)); // Remove ID from idsToSearch
  };

  // Handler to clear all terms
  const handleClearAll = () => {
    setAppliedFilters([]); // Clear all applied filters
    setIdsToSearch([]); // Clear all IDs in idsToSearch
    setGenomicParametersToSearch([])
  };

  // Handler to handle predefined terms from FilterBox
  const handleAddPredefinedTerm = (term: string, type: 'genomic' | 'filtering') => {
    if (type === 'genomic') {
      setPredefinedGenomicTerm(term); // Set term in the genomic query
    } else {
      setPredefinedFilteringTerm(term); // Set term in the filtering query
    }
  };

  return (
    <div>
      <Navbar />
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
            addPredefinedTerm={handleAddPredefinedTerm} // Add handler to pass predefined terms
          />
          <div className='search-members-container'>
            <div className='search-box'>
              <h2>Search</h2>
              <SearchModule
                appliedFilters={appliedFilters} // Pass applied filters
                idsToSearch={idsToSearch} // Pass selected IDs
                setGenomicParametersToSearch={setGenomicParametersToSearch}
                genomicParametersToSearch={genomicParametersToSearch}
                addFilterTerm={handleAddTerm} // Handler to add a filter term
                removeFilterTerm={handleRemoveTerm} // Handler to remove a filter term
                clearAllFilters={handleClearAll} // Handler to clear all filters
                predefinedGenomicTerm={predefinedGenomicTerm || ''} // Pass predefined genomic term
                predefinedFilteringTerm={predefinedFilteringTerm || ''} // Pass predefined filtering term
                resetPredefinedTerms={resetPredefinedTerms}
              />
            </div>
            {!showFilteringTerms && (
              <div className='members-box'>
                <h2>Beacon Network Members</h2>
                <StateBeacons />
              </div>
            )}
            {showFilteringTerms && (
              <div className='filtering-terms-box'>
                <FilteringTerms
                  selectedTerms={idsToSearch} // Pass selected term IDs to FilteringTerms
                  onAddTerm={handleAddTerm} // Handler to add a term
                  onRemoveTerm={handleRemoveTerm} // Handler to remove a term
                />
              </div>
            )}
          </div>
        </div>

        <Routes>
          <Route path='/' element={<div></div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react'
import './SearchModule.css'
import axios from 'axios'
import configData from '../../config.json';
interface FilteringTerm {
  id: string
  label?: string
}

interface SearchModuleProps {
  appliedFilters: FilteringTerm[]
  idsToSearch: string[]
  genomicParametersToSearch: string[]
  addFilterTerm: (id: string, label: string) => void
  removeFilterTerm: (id: string) => void
  clearAllFilters: () => void
  predefinedGenomicTerm?: string
  predefinedFilteringTerm?: string
  resetPredefinedTerms: () => void
  setGenomicParametersToSearch: React.Dispatch<React.SetStateAction<string[]>>
  onSearch: () => void; // New prop to trigger the search modal
}

const SearchModule: React.FC<SearchModuleProps> = ({
  appliedFilters,
  idsToSearch,
  genomicParametersToSearch,
  setGenomicParametersToSearch,
  addFilterTerm,
  removeFilterTerm,
  clearAllFilters,
  predefinedGenomicTerm = '',
  predefinedFilteringTerm = '',
  resetPredefinedTerms,
  onSearch,
}) => {
  // Local states to handle predefined terms
  const [localGenomicTerm, setLocalGenomicTerm] = useState(
    predefinedGenomicTerm || ''
  )
  const [localFilteringTerm, setLocalFilteringTerm] = useState(
    predefinedFilteringTerm || ''
  )

  // State for the genomic query
  const [genomicQuery, setGenomicQuery] = useState(localGenomicTerm || '')
  const [selectedGenome, setSelectedGenome] = useState('GRCh38')
  const [appliedQueries, setAppliedQueries] = useState<string[]>([])

  // State for the filtering terms query
  const [filterQuery, setFilterQuery] = useState(localFilteringTerm || '')
  const [filterSuggestions, setFilterSuggestions] = useState<FilteringTerm[]>(
    []
  )
  const [allFilteringTerms, setAllFilteringTerms] = useState<FilteringTerm[]>(
    []
  )

  // State to track active section (either 'genomic' or 'filtering')
  const [activeSection, setActiveSection] = useState<'genomic' | 'filtering'>(
    'genomic'
  )

  // Reference to the input and suggestion container to detect outside clicks
  const inputRef = useRef<HTMLDivElement | null>(null)

  // Fetch filtering terms when the component mounts
  useEffect(() => {
    const fetchFilteringTerms = async () => {
      try {
        const res = await axios.get(configData.API_URL + '/filtering_terms')
        const terms = res.data.response.filteringTerms.map((element: any) => ({
          id: element.id,
          label: element.label
        }))
        setAllFilteringTerms(terms)
      } catch (error) {
        console.error('Error fetching filtering terms:', error)
      }
    }

    fetchFilteringTerms()
  }, [])

  // Filter the terms based on input
  useEffect(() => {
    if (filterQuery) {
      const filtered = allFilteringTerms.filter(term =>
        term.label?.toLowerCase().includes(filterQuery.toLowerCase())
      )
      setFilterSuggestions(filtered)
    } else {
      setFilterSuggestions([])
    }
  }, [filterQuery, allFilteringTerms])

  // Add genomic query to applied queries and reset input
  const addGenomicQuery = () => {
    if (genomicQuery) {
      setGenomicParametersToSearch(prev => [
        ...prev,
        `${selectedGenome}: ${genomicQuery}`
      ])
      setGenomicQuery('') // Clear the input
      setLocalGenomicTerm('') // Reset local genomic term
      setActiveSection('genomic')
    }
  }

  // Add filter term and reset filter input
  const handleAddFilterTerm = (id: string, label: string) => {
    addFilterTerm(id, label) // Call parent prop function to add the term to applied filters
    setFilterQuery('') // Clear the filter input after adding a term
    setLocalFilteringTerm('') // Reset local filtering term
    setActiveSection('filtering') // Switch back to the filtering section
  }

  // Remove a genomic parameter from the applied queries
  const removeGenomicQuery = (query: string) => {
    setGenomicParametersToSearch(prev => prev.filter(param => param !== query))
  }

  // Update the predefined term when it changes
  useEffect(() => {
    if (predefinedGenomicTerm) {
      setGenomicQuery(predefinedGenomicTerm)
      setFilterQuery('') // Clear filtering query when selecting a genomic term
      setLocalGenomicTerm(predefinedGenomicTerm) // Set local genomic term
      setActiveSection('genomic')
    }
    if (predefinedFilteringTerm) {
      setFilterQuery(predefinedFilteringTerm)
      setGenomicQuery('') // Clear genomic query when selecting a filtering term
      setLocalFilteringTerm(predefinedFilteringTerm) // Set local filtering term
      setActiveSection('filtering')
    }
    resetPredefinedTerms()
  }, [predefinedGenomicTerm, predefinedFilteringTerm, resetPredefinedTerms])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setFilterSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Clear the filtering input
  const clearFilterQuery = () => {
    setFilterQuery('')
    setLocalFilteringTerm('') // Reset local filtering term
  }

  return (
    <div className='search-module'>
      <div className='search-inputs' ref={inputRef}>
        {/* Genomic Query Section */}
        <div
          className={`genomic-query ${
            activeSection === 'genomic' ? 'active' : ''
          }`}
        >
          <label>Genomic Query</label>
          <div className='genomic-input'>
            <select
              value={selectedGenome}
              onChange={e => setSelectedGenome(e.target.value)}
              onClick={() => setActiveSection('genomic')}
            >
              <option value='GRCh38'>GRCh38</option>
              <option value='GRCh37'>GRCh37</option>
            </select>
            <input
              type='text'
              value={genomicQuery}
              onChange={e => setGenomicQuery(e.target.value)}
              onFocus={() => setActiveSection('genomic')}
              placeholder='Search by genomic query'
            />
            <button onClick={addGenomicQuery}>+</button>
          </div>
        </div>

        {/* Filtering Term Query Section */}
        <div
          className={`filtering-query ${
            activeSection === 'filtering' ? 'active' : ''
          }`}
        >
          <label>Filtering Term Query</label>
          <div className='filter-input'>
            <input
              type='text'
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              onFocus={() => setActiveSection('filtering')}
              placeholder='Search filtering terms'
            />
            {filterQuery && (
              <span className='clear-filter' onClick={clearFilterQuery}>
                ×
              </span>
            )}{' '}
            {/* Clear button */}
            <button>+</button>
          </div>

          {/* Show suggestions below the input */}
          {filterSuggestions.length > 0 && (
            <ul className='suggestions-box'>
              {filterSuggestions.map((term, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleAddFilterTerm(term.id, term.label || term.id)
                  }
                >
                  {term.label || term.id}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Query Applied Section */}
      <div className='search-query'>
        <div className='applied-filters-container'>
          <h3>Query applied</h3>
          <div className='applied-filters'>
            {/* Applied filtering terms */}
            {appliedFilters.map(filter => (
              <span key={filter.id} className='applied-filter-tag'>
                {filter.label}
                <button
                  className='remove-button'
                  onClick={() => removeFilterTerm(filter.id)}
                >
                  X
                </button>
              </span>
            ))}
            {/* Applied genomic terms */}
            {genomicParametersToSearch.map((param, index) => (
              <span key={index} className='applied-filter-tag'>
                {param}
                <button
                  className='remove-button'
                  onClick={() => removeGenomicQuery(param)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>
        <button className='clear-button' onClick={clearAllFilters}>
          Clear all
        </button>
      </div>

      <div className='search-container'>
      <button className="search-button" onClick={onSearch}>Search</button>
      </div>
    </div>
  )
}

export default SearchModule

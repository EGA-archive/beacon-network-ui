import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './FilteringTerms.css'

interface FilteringTerm {
  id: string
  label?: string
  scopes?: string[]
}

interface FilteringTermsProps {
  selectedTerms: string[]
  onAddTerm: (id: string, label: string) => void // Modify this line to accept label
  onRemoveTerm: (id: string) => void
}

const ITEMS_PER_PAGE = 40

const FilteringTerms: React.FC<FilteringTermsProps> = ({
  selectedTerms,
  onAddTerm,
  onRemoveTerm
}) => {
  const [filteringTerms, setFilteringTerms] = useState<FilteringTerm[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>('') // For search input

  // Fetch filtering terms from API when the component mounts
  useEffect(() => {
    const fetchFilteringTerms = async () => {
      try {
        const res = await axios.get(
          'https://beacon-network-backend-test.ega-archive.org/beacon-network/v2.0.0/filtering_terms'
        )
        setFilteringTerms(res.data.response.filteringTerms)
      } catch (error) {
        console.error('Error fetching filtering terms:', error)
      }
    }
    fetchFilteringTerms()
  }, [])

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const filteredTerms = filteringTerms.filter(term => {
    const searchLower = searchQuery.toLowerCase()
    const labelMatch = term.label?.toLowerCase().includes(searchLower)
    const idMatch = term.id.toLowerCase().includes(searchLower)
    const scopeMatch = term.scopes
      ?.join(' ')
      .toLowerCase()
      .includes(searchLower)
    return labelMatch || idMatch || scopeMatch
  })
  const currentTerms = filteredTerms.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE)

  // Handle pagination
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  // Handle checkbox selection

  const handleCheckboxChange = (id: string, label: string = '') => {
    if (selectedTerms.includes(id)) {
      onRemoveTerm(id) // Deselect the term
    } else {
      onAddTerm(id, label || id) // Pass the label if available, otherwise pass the ID
    }
  }

  return (
    <div className='filtering-terms'>
      <div className='table-header'>
        <h2>Filtering Terms</h2>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search keywords'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='search-input'
          />
        </div>
      </div>
      <div className='table-wrapper'>
        <table className='filtering-table'>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Label</th>
              <th>Scope</th>
            </tr>
          </thead>
          <tbody>
            {currentTerms.map(term => (
              <tr key={term.id}>
                <td>
                  <input
                    type='checkbox'
                    checked={selectedTerms.includes(term.id)}
                    onChange={() => handleCheckboxChange(term.id, term.label)}
                  />
                </td>
                <td>{term.id}</td>
                <td>{term.label || '-'}</td>
                <td>{term.scopes?.join('     ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default FilteringTerms

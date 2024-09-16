import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../config.json';

interface AfterSearchModuleProps {
  idsToSearch: string[];
  genomicParametersToSearch: string[];
}

const AfterSearchModule: React.FC<AfterSearchModuleProps> = ({ idsToSearch, genomicParametersToSearch }) => {
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);
  const [results, setResults] = useState(null); // To store the results from the API

  useEffect(() => {
 
    const performSearch = async () => {
      let arrayFilters: any[] = [];

      // Construct filters based on idsToSearch
      idsToSearch.forEach((element) => {
        let filter = { id: element };
        arrayFilters.push(filter);
      });

      // Include genomicParametersToSearch in filters if needed
      genomicParametersToSearch.forEach((element) => {
        let filter = { id: element }; // Customize this as needed based on API structure
        arrayFilters.push(filter);
      });

      // Prepare the payload
      let jsonData1 = {
        meta: {
          apiVersion: '2.0',
        },
        query: {
          filters: arrayFilters,
          includeResultsetResponses: 'HIT',
          pagination: {
            skip: skip,
            limit: limit,
          },
          testMode: false,
          requestedGranularity: 'record',
        },
      };

      console.log(JSON.stringify(jsonData1))

      try {
        // Make the API request
        const res = await axios.post(configData.API_URL + '/individuals', JSON.stringify(jsonData1));
        setResults(res.data); // Store the results from the API response
        console.log(res.data)
      } catch (error) {
        console.error('Error performing search:', error);
      }
    };

    // Only perform the search if there are ids to search
    if (idsToSearch.length > 0 || genomicParametersToSearch.length > 0) {
      performSearch();
    }
  }, [idsToSearch, genomicParametersToSearch, limit, skip]);

  return (
    <div>
      <h2>Search Results</h2>
      {/* Render the results */}
      {results ? (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default AfterSearchModule;

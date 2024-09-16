import React, { useState, useEffect } from 'react';
import './StateBeacons.css';
import { TbPointFilled } from 'react-icons/tb';
import axios from 'axios';
import configData from '../../config.json';

interface BeaconResponse {
  response: {
    organization: {
      logoUrl: string;
      name: string;
    };
    name: string;
    description: string;
  };
  meta: {
    beaconId: string;
  };
}

interface StateBeaconsProps {
  isNetwork: boolean;
}

const StateBeacons: React.FC<StateBeaconsProps> = ({ isNetwork }) => {
  const [beaconData, setBeaconData] = useState<BeaconResponse[]>([]);
  const [errorBeacon, setErrorBeacon] = useState<boolean>(false); // Track the error state

  useEffect(() => {
    const fetchBeacons = async () => {
      try {
        let resp: BeaconResponse[] = [];

        if (isNetwork) {
          // Fetch network-level beacons
          const res = await axios.get(configData.API_URL + '/info');
          res.data.responses.forEach((element: BeaconResponse) => {
            resp.push(element);
          });
          // Move the specific beacon to the end and reverse
          resp.forEach((element, index) => {
            if (element.meta.beaconId === 'org.ega-archive.ga4gh-approval-beacon-test') {
              resp.splice(index, 1);
              resp.push(element);
              resp.reverse();
            }
          });
        } else {
          // Fetch individual beacon information
          const res = await axios.get(configData.API_URL + '/info');
          resp.push(res.data);
        }

        setBeaconData(resp); // Set the response data to state
        setErrorBeacon(false); // Set errorBeacon to false if data loads successfully
      } catch (error) {
        console.error('Error fetching beacon data:', error);
        setErrorBeacon(true); // Set errorBeacon to true if there's an error
      }
    };

    fetchBeacons();
  }, [isNetwork]);

  return (
    <div className="state-beacons">
      {beaconData.map((beacon, index) => (
        <div key={index} className="icon-container">
          <TbPointFilled
            className={errorBeacon ? 'error-icon' : 'success-icon'} // Use dynamic class based on errorBeacon
          />
          <img
            src={beacon.response.organization.logoUrl}
            alt={beacon.response.organization.name}
            className={`icon-state ${beacon.response.organization.name === 'SJD' ? 'small-icon' : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

export default StateBeacons;

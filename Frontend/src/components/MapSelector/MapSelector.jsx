import MapSelector from "../../components/MapSelector/MapSelector";
import React from 'react';

const MapSelector = ({ onLocationSelect }) => {
  return (
    <div className="map-selector-container">
      <p>🗺️ Map Placeholder</p>
      <button 
        onClick={() => onLocationSelect({ lat: 27.7172, lng: 85.3240, address: 'Kathmandu, Nepal' })}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Select Kathmandu (Demo)
      </button>
    </div>
  );
};

export default MapSelector;
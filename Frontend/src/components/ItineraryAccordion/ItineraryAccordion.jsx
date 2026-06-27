import ItineraryAccordion from "../../components/ItineraryAccordion/ItineraryAccordion";
import React from 'react';

const ItineraryAccordion = ({ itinerary }) => {
  if (!itinerary) return null;

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
      <h4 style={{ marginBottom: '10px' }}>Generated Itinerary</h4>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
        {JSON.stringify(itinerary, null, 2)}
      </pre>
    </div>
  );
};

export default ItineraryAccordion;
// Summary.js
import React from 'react';

const Summary = ({ insuranceSelected }) => {
  return (
    <div className="summary hidden">
      <h2>Summary</h2>
      <p>
        Insurance selected:{" "}
        <strong>{insuranceSelected ? "Yes" : "No"}</strong>
      </p>
    </div>
  );
};

export default Summary;
import React from 'react';

function Loading({value}) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h5 className='my-5'>Loading {value}...</h5>
    </div>
  );
}

export default Loading;


import React from 'react';

const MapFooter = ({ pointCoordinates, destinationCoordinates }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '58%', 
        transform: 'translateX(-58%)',
        backgroundColor: 'red', 
        color: 'black', 
        padding: '4px',
        borderRadius: '4px',
        zIndex: 2, 
      }}
    >
      {`Latitude: ${pointCoordinates[1]}, Longitude: ${pointCoordinates[0]}`}
    </div>
  );
};

export default MapFooter;

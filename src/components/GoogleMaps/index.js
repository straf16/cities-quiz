import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div>
    <img
      src="https://svgsilh.com/svg_v2/1674807.svg"
      width="20"
      height="20"
      alt="flag"/>
  </div>
);

const SimpleMap = ({ placeFlag, setFlag }) => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '60vh', width: '80vw', margin: 20 }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_API_KEY,
          language: 'en'
        }}
        defaultCenter={{ lat: 52.37, lng: 4.89 }}
        defaultZoom={4}
        onClick={({ x, y, lat, lng, event }) => setFlag({ lat, lng })}
      >
        <AnyReactComponent
          lat={placeFlag.lat}
          lng={placeFlag.lng}
        />
      </GoogleMapReact>
    </div>
  )
}

export default SimpleMap;

import React, { useState, useEffect } from 'react';
import './App.css';

import BoxStatus from './components/BoxStatus'
import GoogleMap from './components/GoogleMaps'

import data from './assets/data.json'

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d > 1) return Math.round(d);
  else if (d <= 1) return Math.round(d * 1000) + "m";
  return d;
}

function App() {
  const [score, setScore] = useState(1500)
  const [city, setCity] = useState({})
  const [placementFlag, setPlacementFlag] = useState({})
  const [totalCities, setTotalCities] = useState(0)

  const cities = data.cities

  const randCity = () => {
    setCity(cities[Math.floor(Math.random() * cities.length)])
  }

  const reset = () => {
    setScore(1500)
    setTotalCities(0)
    setPlacementFlag({})
  }

  const placeButton = (e) => {
    e.preventDefault()
    let distance = getDistance(city.position.lat, city.position.lng, placementFlag.lat, placementFlag.lng)
    console.log(distance)
    if (score - distance <= 0) {
      let s = totalCities
      reset()
      return alert(`Game Over, You found ${s} cities`)
    } else {
      if (distance <= 50) {
        setScore(score - distance)
        setTotalCities(totalCities + 1)
      } else {
        setScore(score - distance)
      }
      randCity()
    }
  }

  useEffect(() => {
    randCity()
  }, [])

  if (!city) {
    return <p>loading</p>
  }

  return (
    <div className="App">
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <BoxStatus numKM={ score } numCities={ totalCities } />
      </div>
      <h4 className="text">Select the location of</h4>
      <h4 className="text">"{city.name}"</h4>
      <div>
        <GoogleMap placeFlag={placementFlag} setFlag={setPlacementFlag}/>
      </div>
      <button
      onClick={placeButton}
        style={{ marginLeft: "auto", marginRight: "10vw" }}
      >
        place
      </button>
    </div>
  );
}

export default App;

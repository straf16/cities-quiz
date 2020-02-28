import React from "react";
import './boxStatus.css'

const BoxStatus = ({ numKM, numCities }) => {
  return (
    <>
      <div className="box">
        <p className="text">{numCities} cities placed</p>
      </div>
      <div className="box">
        <p className="text">{numKM} kilometers left</p>
      </div>
    </>
  )
}

export default BoxStatus

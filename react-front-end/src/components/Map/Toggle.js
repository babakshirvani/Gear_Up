import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Toggle.css';

export default function Toggle(props) {

  const { recommendation, myTrip } = props.mapLists;
  
  return (
    <div id="listing-group" className="listing-group">
      <input type="radio" className="btn-check" name="maplist" id="popular-places" onClick={() => props.setMapList(recommendation)} />
      <label className="btn btn-secondary" htmlFor="popular-places">Popular Places</label>
      <br />
      <input type="radio" className="btn-check" name="maplist" id="my-trips" onClick={() => props.setMapList(myTrip)} />
      <label className="btn btn-secondary" htmlFor="my-trips">My Trips</label>
    </div>
  )
}
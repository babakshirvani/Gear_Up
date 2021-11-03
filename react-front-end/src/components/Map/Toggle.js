import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Toggle.css';

export default function Toggle(props) {
  const [recommendations, setRecommendations] = useState(props.mapLists.recommendations)
  const [plannedTrips, setPlanned] = useState(props.mapLists.plannedTrips)
  const [completedTrips, setCompletedTrips] = useState(props.mapLists.completedTrips)

  useEffect(() => {
    setRecommendations(props.mapLists.recommendations)
    console.log("recommendations", recommendations)
  }, [props.mapLists.recommendations])
  useEffect(() => {
    setPlanned(props.mapLists.plannedTrips)
    console.log("plannedTrips", plannedTrips)
  }, [props.mapLists.plannedTrips])
  useEffect(() => {
    setCompletedTrips(props.mapLists.completedTrips)
    console.log("completedTrips", completedTrips)
  }, [props.mapLists.completedTrips])

  return (
    <>

      <div id="listing-group" className="listing-group">
        {props.mapLists && console.log("005console.log(recommendations)", props.mapLists)}
        <input type="radio" className="btn-check" name="maplist" id="popular-places" onClick={() => props.setMapList(recommendations)} />
        <label className="btn btn-secondary" htmlFor="popular-places">Popular Places</label>
        <br />
        <input type="radio" className="btn-check" name="maplist" id="my-trips" onClick={() => props.setMapList(plannedTrips)} />
        <label className="btn btn-secondary" htmlFor="my-trips">Planned Trips</label>
        <br />
        <input type="radio" className="btn-check" name="maplist" id="my-completedtrips" onClick={() => props.setMapList(completedTrips)} />
        <label className="btn btn-secondary" htmlFor="my-completedtrips">Completed Trips</label>
      </div>)
    </>
  )
}
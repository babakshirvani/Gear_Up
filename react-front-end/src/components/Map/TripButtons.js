import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TripButton.css';

export default function TripButtons(props) {
  // const [recommendations, setRecommendations] = useState(props.mapLists.recommendations)
  // const [plannedTrips, setPlanned] = useState(props.mapLists.plannedTrips)
  // const [completedTrips, setCompletedTrips] = useState(props.mapLists.completedTrips)

  // useEffect(() => {
  //   setRecommendations(props.mapLists.recommendations)
  //   console.log("recommendations", recommendations)
  // }, [props.mapLists.recommendations])
  // useEffect(() => {
  //   setPlanned(props.mapLists.plannedTrips)
  //   console.log("plannedTrips", plannedTrips)
  // }, [props.mapLists.plannedTrips])
  // useEffect(() => {
  //   setCompletedTrips(props.mapLists.completedTrips)
  //   console.log("completedTrips", completedTrips)
  // }, [props.mapLists.completedTrips])

  return (
      <div id="button-group" className="button-group">
        <input type="button" className="btn-check" name="trip-info" id="trip-direction" onClick={() => {window.open(`https://www.google.com/maps/dir/Current+Location/${props.latitude},${props.longitude}`)}} />
        <label className="btn btn-secondary" htmlFor="trip-direction" id="trip-direction">direction</label>

        <input type="button" className="btn-check" name="trip-info" id="trip-checklist" onClick />
        <label className="btn btn-secondary" htmlFor="trip-checklist" id="trip-checklist">checklist</label>

        <input type="button" className="btn-check" name="trip-info" id="trip-delete" onClick />
        <label className="btn btn-secondary" htmlFor="trip-delete" id="trip-delete">delete</label>
      </div>)
}
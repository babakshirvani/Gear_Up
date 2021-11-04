import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TripButton.css';
import axios from 'axios';

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

  // const handleDeleteTrip = (id) => {
  //   console.log("delete clicked", id)
  //   axios.delete(`/api/trips/delete/${id}`)
  //     .then(() => {
  //       window.location.href = '/calendar'
  //     })
  // }


  const handleDeleteTrip = (id) => {
    console.log("delete clicked", id)
    axios.delete(`/api/trips/delete/${id}`)
    .then((res) =>{
      console.log("0098", res)
      if(res.status === 200) {
        props.setCurrentTrip(null)
      }
    })
  }



  return (
    <div id="button-group" className="button-group">
      <input type="button" className="btn-check" name="trip-info" id="trip-direction" onClick={() => { window.open(`https://www.google.com/maps/dir/Current+Location/${props.latitude},${props.longitude}`) }} />
      <label className="btn btn-secondary" htmlFor="trip-direction" id="trip-direction">direction</label>
      {(!props.friendAvatarURL && props.checkListed) &&
        (<>
          <input type="button" className="btn-check" name="trip-info" id="trip-checklist" />
          <label className={"btn btn-secondary"} htmlFor="trip-checklist" id="trip-checklist">
            <Link to={`/tripGearList/${props.tripID}`} >checklist</Link>
          </label>
        </>)
      }
      {(props.currentTrip.creator_id && !props.friendAvatarURL) && 
        (<>
          <input type="button" className="btn-check" name="trip-info" id="trip-delete" onClick={() => handleDeleteTrip(props.tripID)} />
          <label className="btn btn-secondary" htmlFor="trip-delete" id="trip-delete">delete</label>
        </>)
      }
    </div>)
}
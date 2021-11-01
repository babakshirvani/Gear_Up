
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherApp from '../components/Weather/WeatherApp';
import './Styles/Dashboard.scss';
import { FutureTrips } from '../components/Dashboard/FutureTrips';

const Dashboard = () => {

  const [friendlist, setFriendlist] = useState([]);
  
  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/friendlist/${user_id}`)
    .then((res)=>{
      setFriendlist([...res.data]);
    })
  }, [])
  
  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/trips/dashboard/${user_id}`)
    .then((res)=>{
      console.log("UPCOMING TRIPS ", res.data);
    })
  }, [])

 
  
  return (
    <div className="container">
      <FutureTrips />
      <div className="weather-app-container">
        <WeatherApp />
      </div>

    </div>
  )
}
export default Dashboard;

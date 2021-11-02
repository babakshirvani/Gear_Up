
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherApp from '../components/Weather/WeatherApp';
import './Styles/Dashboard.scss';
import { FutureTrips } from '../components/Dashboard/FutureTrips';

const Dashboard = () => {

  const [friendList, setFriendList] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [trip1, setTrip1] = useState(null);
  
  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/friendlist/${user_id}`)
    .then((res)=>{
      setFriendList([...res.data]);
    })
  }, [])
  
  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/trips/dashboard/${user_id}`)
    .then((res)=>{
      setUpcomingTrips([...res.data]);
    })
  }, [])
 
  return (
    <div className="container">
        <FutureTrips upcomingTrips={upcomingTrips} friendList={friendList}/>
      <div className="weather-app-container">
        <WeatherApp />
      </div>

    </div>
  )
}
export default Dashboard;

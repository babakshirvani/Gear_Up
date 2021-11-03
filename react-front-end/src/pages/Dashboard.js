
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import WeatherApp from '../components/Weather/WeatherApp';
import './Styles/Dashboard.scss';
import { FutureTrips } from '../components/Dashboard/FutureTrips';
import { MoreTrips } from '../components/Dashboard/MoreTrips';
import FriendList from '../components/Friendship/Friendlist'
import PieChart from '../components/Dashboard/PieChart';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {

  const [friendList, setFriendList] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripStats, setTripStats] = useState({});

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    axios.get(`api/friendlist/${user_id}`)
      .then((res) => {
        setFriendList([...res.data]);
      })
  }, [])

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    axios.get(`api/trips/dashboard/${user_id}`)
      .then((res) => {
        setUpcomingTrips([...res.data]);
      })
  }, [])

  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/trips/dashboard/stats/${user_id}`)
    .then((res)=>{
      setTripStats([...res.data][0]);
      console.log('res.data', res.data);
    })
  }, [])

  return (
    <div className="dashboard-container">
      <FutureTrips upcomingTrips={upcomingTrips} friendList={friendList}/>
      <div className="dashboard-container-middle">
        <div className="dashboard-container-middle-left">
          <WeatherApp />
          <div className="dashboard-container-bottom-left">
            <FriendList />
            <PieChart tripStats={tripStats} />
          </div>
        </div>
        <MoreTrips upcomingTrips={upcomingTrips} friendList={friendList} />
      </div>
      {/* <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item><FutureTrips upcomingTrips={upcomingTrips}/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><FriendList/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item></Item>
        </Grid>
        <Grid item xs={8}>
          <Item>  <WeatherApp /></Item>
        </Grid>
      </Grid>
    */}

      {/* <div className="friend-list-container">
      </div> */}
    </div>
  )
}
export default Dashboard;


import React from 'react'
import WeatherApp from '../components/Weather/WeatherApp';
import './Styles/Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="weather-app-container">
        <WeatherApp />
      </div>

    </div>
  )
}
export default Dashboard;

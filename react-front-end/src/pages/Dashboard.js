
import React from 'react'
import WeatherApp from '../components/Weather/WeatherApp';

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="text-center" style={{ paddingTop: "30%" }}>
        Dashboard
      </h1>
      <WeatherApp />


    </div>
  )
}
export default Dashboard;

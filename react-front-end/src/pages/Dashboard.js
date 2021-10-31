
import React from 'react'
import WeatherApp from '../components/Weather/WeatherApp';
import './Styles/Dashboard.scss';
// import { ChakraProvider } from "@chakra-ui/react"

const Dashboard = () => {
  return (
    <div className="container">
      {/* <ChakraProvider> */}
      <div className="weather-app-container">
        <WeatherApp />
      </div>
      {/* </ChakraProvider> */}

    </div>
  )
}
export default Dashboard;

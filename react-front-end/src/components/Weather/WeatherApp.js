import React, { useState, useEffect } from 'react';
import UpcomingDays from "./Forecast/UpcomingDays";
import CurrentDay from "./Forecast/CurrentDay";

import { Button, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react"
import axios from 'axios'
import './Styles/WeatherApp.scss';

function App() {
  const [loading, setLoading] = useState(false);
  const [isLocationExist, setIsLocationExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [locationError, setLocationError] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const onSuccessLocation = async (position) => {
    const location = `lat=${position.coords.latitude},&lon=${position.coords.longitude}`;
    const lat = `${position.coords.latitude}`
    const lon = `${position.coords.longitude}`
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
    setIsLocationExist(true);
    await getWeatherData(lat, lon);
  }

  const onErrorLocation = (err) => {
    setLocationError(`Failed to locate. Error: ${err.message}`);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation);
    } else {
      setLocationError('Sorry. Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }
  //${process.env.REACT_APP_CLIMACELL_API_KEY}

  const getWeatherData = async (lat, lon) => {
    console.log(lat, lon)
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    try {
      const response = await axios.get(url);
      if (response.data) {
        setWeatherData({ ...weatherData, weather: response.data })
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }

  }

  useEffect(() => {
    setLoading(true);
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    if (lon) {
      setIsLocationExist(true);
      getWeatherData(lat, lon);
    }
    setLoading(false);
  }, [])

  return (
    <div className="weather-app">
      {
        loading === true ?
          (
            <div className="weather-app-loader">
              <Progress isIndeterminate hasStripe value={44} size="md" />
            </div>
          ) :
          !isLocationExist ?
            (
              <div className="weather-app-home">
                {
                  locationError !== "" && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertTitle mr={2}>{errorMessage.split(".")[0]}.</AlertTitle>
                      <AlertDescription>{errorMessage.split(".")[1]}.</AlertDescription>
                      <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                  )
                }
                <Button onClick={() => getLocation()}>
                  Get Current Location Weather
                </Button>
              </div>
            ) :
            weatherData.weather ?
              (
                <>
                  {console.log("weatherData6:", weatherData)}
                  <div className="weather-today">
                    <CurrentDay currentWeather={weatherData.weather['current']} />
                  </div>
                  <div className="weather-cards">
                    <div><UpcomingDays weatherData={weatherData.weather.daily.slice(1, 7)} /></div>
                  </div>
                </>
              ) :
              (
                <div className="weather-app-error">
                  <p>{errorMessage}. Please try reloading the page</p>
                </div>
              )
      }
    </div>
  )
}

export default App;

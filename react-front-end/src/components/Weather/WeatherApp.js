import React, { useState, useEffect } from 'react';
import UpcomingDays from "./Forecast/UpcomingDays";
import CurrentDay from "./Forecast/CurrentDay";

import { Button } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import axios from 'axios'
import './Styles/WeatherApp.scss';

function App() {
  const [loading, setLoading] = useState(false);
  const [isLocationExist, setIsLocationExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [locationError, setLocationError] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const onSuccessLocation = async (position) => {
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
    // eslint-disable-next-line
  }, [])

  return (
    <div className="weather-app">
      {
        loading === true ?
          (
            <div style={{
              padding: "10rem 0",
              textAlign: 'center'
            }}>
              <CircularProgress />
            </div>
          ) :
          !isLocationExist ?
            (
              <div className="weather-app-home">
                {
                  locationError !== "" && (
                    <Alert onClose={() => { }} severity="error">
                      <AlertTitle>{errorMessage.split(".")[0]}.</AlertTitle>
                      {errorMessage.split(".")[1]}.
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
                    <UpcomingDays weatherData={weatherData.weather.daily.slice(1, 7)} />
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

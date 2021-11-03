import React from 'react';
import moment from 'moment';
import getIcon from '../assets/icons'
import "../Styles/CurrentDay.scss"

const CurrentDay = ({ currentWeather }) => {
  return (
    <>
      <div className="current-weather" key={currentWeather.dt}>
        <div>
          <p className="current-weather-day">{moment.unix((currentWeather.dt)).format("dddd, MMMM Do YYYY")}</p>
          <p className="current-weather-temp">
            {Math.round(currentWeather.temp)}
            <span>°C</span>
          </p>
        </div>
        <p className="current-weather-status">It's A {currentWeather.weather[0].description} Day</p>
        <img src={getIcon(currentWeather.weather[0].id).icon} alt={currentWeather.weather[0].description} />
      </div>

    </>
  )
}

export default CurrentDay;
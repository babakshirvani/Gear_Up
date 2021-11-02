import React from 'react';
import moment from 'moment';
import getIcon from '../assets/icons'
import "../Styles/UpcomingDays.scss"

const UpcomingDays = ({ weatherData }) => {
  return (
    <>
      {weatherData.map((day, i) => {
        return (
          <div className="weather-card" key={i}>
            <p className="weather-card-day">{moment.unix(Number(day.dt)).format("ddd")}</p>
            <p className="weather-card-date">{moment.unix(Number(day.dt)).format("MMM Do")}</p>
            <img src={getIcon(day.weather[0].id).icon} alt={getIcon(day.weather[0].id).text} />
            <p className="weather-card-temp">{Math.round(day.temp.day)}°C</p>
            <p className="weather-card-condition">{day.weather[0].main}</p>
          </div>
        )
      })}
    </>
  )
}

export default UpcomingDays;
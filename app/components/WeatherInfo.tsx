import Grid from '@mui/material/Grid'
import { WeatherData, City } from './../interfaces'
import { weatherCodeMapping } from '@/public/data/weatherCodeMapping'
import { WeatherIcon } from './WeatherIcon'
import React from 'react'

export function WeatherInfo ({
  weatherData,
  city
}: {
  weatherData: WeatherData;
  city: City;
}) {
  const { icon, description } =
    weatherCodeMapping[weatherData.weathercode] || {}

  return (
    <center>
      <div className="weather-block">
        <WeatherIcon weatherIcon={icon} />
        <Grid container direction="column">
          <h3>{description && description}</h3>
          <span className="smaller-text">
            {city.city}, {city.country}{' '}
          </span>
          <br />
          <span className="smaller-text">{weatherData.date.toString()}</span>
        </Grid>
      </div>
      <hr />
      <div className="umbrella-block">
        <img className="minor-icon" src="/images/weather_icons/umbrella.png" />
        <Grid container direction="column" className="weather-text">
          Chance of Precipitation: {weatherData.precipitationProbabilityMean}%{' '}
          <br />
        </Grid>
      </div>
      <div className="weather-block">
        <img
          className="minor-icon temperature-icon"
          src="/images/weather_icons/thermometer.png"
        />
        <Grid container direction="column" className="weather-text">
          Max: {weatherData.temperature2mMax}
          {weatherData.temperatureScale} (feels like{' '}
          {weatherData.apparentTemperatureMax}
          {weatherData.temperatureScale}) <br />
          Min: {weatherData.temperature2mMin}
          {weatherData.temperatureScale} (feels like{' '}
          {weatherData.apparentTemperatureMin}
          {weatherData.temperatureScale})<br />
        </Grid>
      </div>
      <div className="weather-block">
        <img className="minor-icon" src="/images/weather_icons/windy.png" />
        <Grid container direction="column" className="weather-text">
          Max Wind Speed: {weatherData.precipitationProbabilityMean} Km/h
        </Grid>
      </div>
    </center>
  )
}

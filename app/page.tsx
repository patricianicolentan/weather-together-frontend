'use client'

import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { Autocomplete, Button, TextField, Hidden } from '@mui/material'
import Grid from '@mui/material/Grid'

import citiesData from './../public/data/cities.json'
import { City, WeatherData } from './interfaces'
import fetchCities from './utils/fetchCities'
import { CircularIndeterminate } from './components/CircularIndeterminate'
import { WeatherInfo } from './components/WeatherInfo'
import { NavLinks } from './components/NavLinks'
import Footer from './components/Footer'

export default function Main () {
  // State
  const [selectedCity1, setSelectedCity1] = useState<City | null>(null)
  const [selectedCity2, setSelectedCity2] = useState<City | null>(null)
  const [suggestedCities, setSuggestedCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [weather1, setWeather1] = useState<WeatherData | null>(null)
  const [weather2, setWeather2] = useState<WeatherData | null>(null)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading, setLoading] = useState(true)

  // Functions

  // handles city search
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value.length % 3 === 0) {
      return
    }
    handleSearch(value)
  }

  // filters city to match search
  const handleSearch = debounce((value: string) => {
    const filtered = suggestedCities.filter((city) =>
      `${city.city}, ${city.country}`
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    setFilteredCities(filtered)
  }, 500) // milliseconds

  // fetches weather data from backend
  const fetchWeatherData = async () => {
    setLoading1(true)
    setLoading2(true)
    try {
      if (!selectedCity1 || !selectedCity2) {
        throw Object.assign(new Error('Two cities are required'))
      }
      const cityID1 = selectedCity1.id
      const lat1 = selectedCity1.lat
      const lng1 = selectedCity1.lng
      const response1 = await fetch(
        `https://weather-together-390806.uc.r.appspot.com/v2/weather?cityID=${cityID1}&lat=${lat1}&lng=${lng1}`
      )
      const data1 = await response1.json()
      setWeather1(data1)
      setLoading1(false)

      const cityID2 = selectedCity2.id
      const lat2 = selectedCity2.lat
      const lng2 = selectedCity2.lng
      const response2 = await fetch(
        `https://weather-together-390806.uc.r.appspot.com/v2/weather?cityID=${cityID2}&lat=${lat2}&lng=${lng2}`
      )
      const data2 = await response2.json()
      setWeather2(data2)
      setLoading2(false)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setLoading1(false)
      setLoading2(false)
    }
  }

  // on mount, get city options
  useEffect(() => {
    const cities = citiesData as City[]
    const filteredCities = fetchCities(cities, '')
    setSuggestedCities(filteredCities)
    setLoading(false)
  }, [])

  // actual components
  return (
    <div>
      {!loading && (
      <><div className="navbar">
          <NavLinks text={'Home'} />
        </div>
        <Grid container spacing={4} className="container">
          {/* Mobile layout */}
          <Hidden mdUp>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Grid
                container
                direction="row"
                className="center"
                sx={{ marginBottom: 4, flexDirection: 'column', alignItems: 'center' }}
              >
                <h2>View the weather together</h2>
                <h4>Choose two cities from anywhere in the world</h4>
                <p style={{ fontSize: 13, textAlign: 'center' }}>Please be patient, as the backend server autoscales <br/>
                i.e. the website naps in between users</p>
              </Grid>
              <Grid
                container
                direction="row"
                className="center"
                sx={{ marginBottom: 4, flexDirection: 'column', alignItems: 'center' }}
              >
                <Autocomplete
                  disablePortal
                  id="city-input-1"
                  options={filteredCities}
                  sx={{ width: '75%', marginBottom: 2 }}
                  getOptionLabel={(city: City) => `${city.city}, ${city.country} (${city.admin_name})`}
                  size="small"
                  value={selectedCity1}
                  onChange={(event, newValue) => {
                    setSelectedCity1(newValue)
                    setWeather1(null)
                  } }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City 1"
                      value={selectedCity1?.city || ''}
                      onChange={handleInputChange} />
                  )} />
                <Autocomplete
                  disablePortal
                  id="city-input-2"
                  options={filteredCities}
                  sx={{ width: '75%', marginBottom: 2 }}
                  getOptionLabel={(city: City) => `${city.city}, ${city.country} (${city.admin_name})`}
                  size="small"
                  value={selectedCity2}
                  onChange={(event, newValue) => {
                    setSelectedCity2(newValue)
                    setWeather2(null)
                  } }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City 2"
                      value={selectedCity2?.city || ''}
                      onChange={handleInputChange} />
                  )} />
              </Grid>
              <Grid
                container
                direction="row"
                className="center"
                sx={{ marginBottom: 5, flexDirection: 'column', alignItems: 'center' }}
              >
                <Button
                  variant="contained"
                  className="goButton"
                  onClick={fetchWeatherData}
                  sx={{ width: '25%' }}
                >
                  <b>Submit</b>
                </Button>
              </Grid>
              <Grid item xs={12} className="center" paddingBottom={4}>
                {weather1 &&
                  selectedCity1 &&
                  !loading1 && (
                    <WeatherInfo weatherData={weather1} city={selectedCity1} />
                )}
                {loading1 && <CircularIndeterminate />}
              </Grid>
              <Grid item xs={12} className="center" paddingBottom={8}>
                {weather2 &&
                  selectedCity2 &&
                  !loading2 && (
                    <WeatherInfo weatherData={weather2} city={selectedCity2} />
                )}
                {loading2 && <CircularIndeterminate />}
              </Grid>
            </Grid>
          </Hidden>

          {/* Desktop layout */}
          <Hidden smDown>
            <Grid container direction="column" sx={{ margin: 5 }}>
              <center>
                <h2>View the weather together</h2>
                <h4>Choose two cities from anywhere in the world</h4>
                <p style={{ fontSize: 13 }}>Please be patient, as the backend server autoscales <br/>
                i.e. the website naps in between users</p>
              </center>
            </Grid>
            <Grid
              container
              direction="row"
              className="center"
              sx={{ marginBottom: 5 }}
            >
              <Autocomplete
                disablePortal
                id="city-input-1"
                options={filteredCities}
                sx={{ width: 300, marginRight: 5 }}
                getOptionLabel={(city: City) => `${city.city}, ${city.country} (${city.admin_name})`}
                size="small"
                value={selectedCity1}
                onChange={(event, newValue) => {
                  setSelectedCity1(newValue)
                  setWeather1(null)
                } }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City 1"
                    value={selectedCity1?.city || ''}
                    onChange={handleInputChange} />
                )} />
              <Autocomplete
                disablePortal
                id="city-input-2"
                options={filteredCities}
                sx={{ width: 300 }}
                getOptionLabel={(city: City) => `${city.city}, ${city.country} (${city.admin_name})`}
                size="small"
                value={selectedCity2}
                onChange={(event, newValue) => {
                  setSelectedCity2(newValue)
                  setWeather2(null)
                } }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City 2"
                    value={selectedCity2?.city || ''}
                    onChange={handleInputChange} />
                )} />
            </Grid>
            <Grid
              container
              direction="row"
              className="center"
              sx={{ marginBottom: 5 }}
            >
              <Button
                variant="contained"
                className="goButton"
                onClick={fetchWeatherData}
              >
                <b>Submit</b>
              </Button>
            </Grid>
            <Grid item xs={6} className="center">
              {weather1 &&
                selectedCity1 &&
                !loading1 && (
                  <WeatherInfo weatherData={weather1} city={selectedCity1} />
              )}
              {loading1 && <CircularIndeterminate />}
            </Grid>
            <Grid item xs={6} className="center">
              {weather2 &&
                selectedCity2 &&
                !loading2 && (
                  <WeatherInfo weatherData={weather2} city={selectedCity2} />
              )}
              {loading2 && <CircularIndeterminate />}
            </Grid>
          </Hidden>
        </Grid>
        <Footer /></>
      )}
      {loading && (
        <div className="center middle">
          <CircularIndeterminate />
        </div>
      )}
    </div>
  )
}

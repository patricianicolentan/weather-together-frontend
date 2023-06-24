'use client'

import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import { NavLinks } from './../components/NavLinks'
import { CircularIndeterminate } from '../components/CircularIndeterminate'
import Footer from './../components/Footer'

export default function About () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div>
      {!loading && (
        <><div className="navbar-about">
            <NavLinks text={'About'} />
            <span className="appName">Weather Together</span>
          </div>
        <Grid container className="container">
          <Grid
            container
            direction="column"
            sx={{ margin: 5 }}
            className="about-grid"
          >
            <center>
              <Card sx={{ minWidth: 275, marginBottom: 5 }}>
                <CardContent>
                  <h2>About the Application</h2>
                  <p>
                    Uses the{' '}
                    <a href="https://open-meteo.com/en/docs">Open Meteo API</a>{' '}
                    for daily weather forecasts,
                    <br />
                    and the{' '}
                    <a href="https://simplemaps.com/data/world-cities">
                      World Cities Database
                    </a>{' '}
                    for city names and coordinates
                  </p>
                  <div className="first-half">
                    <span className="inline-bold">Backend</span>
                    <br />
                    <span>
                      Java && Spring Boot
                      <br />
                      MongoDB && GraphQL
                    </span>
                  </div>
                  <br />
                  <div className="second-half">
                    <span className="inline-bold">Frontend</span>
                    <br />
                    <span>
                      JavaScript && React (Next.js)
                      <br />
                      Components from Material UI
                    </span>
                  </div>
                  <br />
                  <span className="inline-bold">Caching</span>
                  <br />
                  <span>
                    I leverage caching to enhance performance.
                    <br />
                    If my MongoDB database already has the forecast for a city
                    ID and the server's current date, I return it. Otherwise, I
                    fetch it from Open Meteo, cache it, and then return it.
                  </span>
                  <br />
                  <br />
                  <span className="inline-bold">Version 1</span>
                  <br />
                  <span>
                    I fetched the list of cities from my MongoDB database.
                    <br />
                    The user would select two cities, and I would
                    call the backend with the coordinates. However, this
                    turned out to be too sluggish.
                  </span>
                  <br />
                  <br />
                  <span className="inline-bold">Version 2</span>
                  <br />
                  <span>
                    To improve performance and reduce response times, the city
                    data is stored as a JSON file in the frontend. When users
                    select two cities and click "Submit", I call
                    the backend with the City ID and coordinates.
                  </span>
                  <br />
                  {/* <b>Design Choices</b>
<ul>
<li>
I chose Spring Boot over Spring due to the simplicity of
the project, which I wanted to develop and ship quickly.
</li>
<br />
<li>
I used NoSQL to maintain flexibility without a predefined
schema, and MongoDB due to its simple integration with
Spring Boot.
</li>
<br />
<li>
I planned on accounting for timezone differences when
caching forecasts, but for expediency I currently use just
one date.
</li>
</ul> */}
                  <h2>About the Developer</h2>
                  <p>Patricia Nicole Tan</p>
                  <p>Software Engineer</p>
                  <span>
                    <a
                      href="mailto:weather.together.web@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Email
                    </a>
                    &nbsp; | &nbsp;
                    <a
                      href="https://www.linkedin.com/in/patricianicoletan/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    &nbsp; | &nbsp;
                    <a
                      href="https://github.com/patricianicolentan"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </span>
                  <br />
                </CardContent>
              </Card>
            </center>
          </Grid>
        </Grid><Footer /></>
      )}
      {loading && (
        <div className="center middle">
          <CircularIndeterminate />
        </div>
      )}
    </div>
  )
}

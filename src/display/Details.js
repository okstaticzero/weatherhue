import React from 'react';
import moment from "moment"
import {WELCOME, CURRENT, RANGE} from '../constants.js'

const Details =({address, weatherData, showSlider, displayType})=>(

  <div className="weather-deets">
     {displayType === WELCOME &&
          <div className="welcome">
            <h2>Welcome to WeatherHue!</h2>
            <h4>Begin by entering a address or zip code</h4>
          </div>
      }
    {address &&
      <div className="details">
        {displayType === CURRENT &&
          <h3 className="title-type">Current Weather</h3>
        }
        {displayType === RANGE &&
          <h3 className="title-type">Range Weather</h3>
        }
        <div className="hr"></div>
        <h3>{address}</h3>
        <h5>{moment.unix(weatherData.time).format('MMMM Do YYYY, h:mm a')}</h5>
        <h1>{Math.round(weatherData.temperature)}°</h1>
        <h2>{weatherData.summary}</h2>
        
      </div>
    }
  </div>
)

export default Details
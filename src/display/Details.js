import React from "react";
import moment from "moment";
import { WELCOME, CURRENT, RANGE } from "../constants.js";

const Loop = ({ arr }) => (
     <div>{
      arr.map((item, i)=>(
        <div key={i}>{item.apparentTemperatureMax}</div>
      ))
     }
     </div>
  )



const Details = ({ address, weatherData, showSlider, displayType }) =>
  <div className="weather-deets">
    {displayType === WELCOME &&
      <div className="welcome">
        <h2>Welcome to WeatherHue!</h2>
        <h4>Begin by entering a address or zip code</h4>
      </div>}
    {address &&
      <div className="details">
        {displayType === CURRENT &&
          <div>
            <h3 className="title-type">Current Weather</h3>
            { /* <Loop arr={weatherData.daily.data} /> */}
          </div>}
        {displayType === RANGE && <h3 className="title-type">Range Weather</h3>}
        <div className="hr" />
        <h3>
          {address}
        </h3>
        <h5>
          {moment
            .unix(weatherData.currently.time)
            .format("MMMM Do YYYY, h:mm a")}
        </h5>
        <h1>
          {Math.round(weatherData.currently.temperature)}°
        </h1>
        <h2>
          {weatherData.currently.summary}
        </h2>
      </div>}
  </div>;

export default Details;

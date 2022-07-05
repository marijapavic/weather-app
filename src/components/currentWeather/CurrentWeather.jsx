import React from "react";
import { iconUrl } from "../../services/weatherService";
import "./currentWeather.css"

function CurrentWeather({
  weather: {main, icon, temp, speed, humidity, feels_like}}) {
  return (
      <div className="current-weather">
        <div className="current-temp">
          <p className="description">{main}</p>
          <div className="current">
            <img src={iconUrl(icon)} alt="" className="icon" />
            <p>{`${temp.toFixed()}°`}</p>
          </div>
        </div>
        <div className="current-details">
          <div>
            <p>feels like: {`${feels_like.toFixed()}°`}</p>
          </div>
          <div>
            <p>humidity: {`${humidity.toFixed()}%`}</p>
          </div>
          <div>
            <p>wind: {`${speed.toFixed()} m/s`}</p>
          </div>
        </div>
      </div>
  );
}

export default CurrentWeather;

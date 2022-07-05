import React from "react";
import { formatTime } from "../../services/weatherService";
import "./details.css"

function Details({ weather: { dt, timezone, name} }) {
  return (
    <div className="details">
        <p className="city">{`${name}`}</p>
        <p className="time">{formatTime(dt, timezone)}</p>
    </div>
  );
}

export default Details;

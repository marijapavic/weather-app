import React from "react";
import { iconUrl } from "../../services/weatherService";
import "./forecastToday.css"

function ForecastToday({ items }) {
  console.log(items);
  return (
    <div>
      <div className="forecast">
        {items.map((item, id) => (
          <div key={id} className="forecast-item">
            <p>{item.title}</p>
            <img src={iconUrl(item.icon)} alt="" />
            <p>{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastToday;

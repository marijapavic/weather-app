import React from "react";
import { iconUrl } from "../../services/weatherService";

function ForecastWeek({ items }) {
  console.log(items);
  return (
    <div>
      <div className="forecast">
        {items.map((item, id) => (
          <div key={id} className="forecast-item">
            <p>{item.title}</p>
            <img src={iconUrl(item.icon)} alt="" />
            <p>{`${item.temp_max.toFixed()}° | ${item.temp_min.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastWeek;

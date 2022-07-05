import { DateTime } from "luxon";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "96496ae177988d686e597473d2cafc9b";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  const res = await fetch(url);
  return await res.json();

};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    dt,
    name
  } = data;
  const { main, icon } = weather[0];

  return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, speed, dt, name, main, icon};
};
 
const formatForecastWeather = (data) => {
  let { timezone, daily, hourly} = data;
  daily = daily.slice(1, 8).map((d) => {
    return {
      title: formatTime(d.dt, timezone, "ccc"),
      temp_max: d.temp.day,
      temp_min: d.temp.night,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 8).map((d) => {
    return {
      title: formatTime(d.dt, timezone, "H:mm"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatTime = (
  secs,
  zone,
  format = "MMMM dd, H:mm"
) =>  DateTime.fromSeconds(secs).setZone(zone).toFormat(format)


const iconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatTime, iconUrl };

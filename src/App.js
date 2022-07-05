import "./App.css";
import Input from "./components/input/Input";
import Details from "./components/details/Details";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import ForecastToday from "./components/forecastToday/ForecastToday";
import ForecastWeek from "./components/forecastWeek/ForecastWeek";
import getFormattedWeatherData from "./services/weatherService";
import { createContext, useEffect, useState } from "react";
import {BrowserRouter, Route, Link, Routes} from "react-router-dom"
import { UilSun, UilMoon } from "@iconscout/react-unicons";


export const ThemeContext = createContext(null)

function App() {
  const [query, setQuery] = useState({q: "Osijek"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        console.log(data)
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <BrowserRouter>
      <div className="app" id={theme}>
        <div className="container">
          <nav className="nav">
            <div className="switch-container">
              <p className="toggletext"><UilSun/></p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" onClick={toggleTheme} checked={theme === "dark"} ></span>
              </label>
              <p className="toggletext"><UilMoon /></p>
            </div>
              <h1>weather</h1>
              <Input setQuery={setQuery} units={units} setUnits={setUnits} />
              <ul className="nav-ul">
                <li className="nav-li">
                  <Link to="/" className="link">now</Link>
                </li>
                <li className="nav-li">
                  <Link to="/today/" className="link">today</Link>
                </li>
                <li className="nav-li">
                  <Link to="/week/" className="link">week</Link>
                </li>
              </ul>
            </nav>
            {weather && (
              <div>
                  <Details weather={weather} />
                  <Routes>
                    <Route path="/" exact element={<CurrentWeather weather={weather}/>} />
                    <Route path="/today/" element={<ForecastToday items={weather.hourly} />} />
                    <Route path="/week/" element={<ForecastWeek items={weather.daily} />} />
                  </Routes>
              </div>
            )}

        </div>
      </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;

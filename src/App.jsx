import { useState } from "react";
import { useGeolocated } from "react-geolocated";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    weatherData();
  }, [city]);

  const weatherData = async () => {
    const response = await fetch(
      city !== ""
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_APP
          }`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${
            coords.latitude
          }&lon=${coords.longitude}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_APP
          }`
    );
    const data = await response.json();
    console.log(data);
    setTemperature(data.main.temp);
    setWeather(data.weather[0].main);
    setCity(data.name);
  };

  return (
    <>
      <h1>Weather</h1>
      <label htmlFor="">Enter City</label>
      <input
        onChange={(event) => {
          setCity(event.target.value);
        }}
        placeholder="City..."
      ></input>
      <button>Search</button>
      <p>{city}</p>
      <p>{temperature}</p>
      <p>{weather}</p>
    </>
  );
}

export default App;

import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState("null");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [dateState, setDateState] = useState(new Date());
  const [firstWordCityName, setFirstWordCityName] = useState(null);
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(false);
  const [state, setState] = useState("");

  useEffect(() => {
    setState("loading");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    }
    if (lat && long) {
      setInterval(() => setDateState(new Date()), 30000);
      axios
        .get("/.netlify/functions/token-hider", {
          params: {
            lat: lat,
            lon: long,
          },
        })
        .then((response) => {
          console.log(response.data);
          setState("success");
          setWeather(response.data);
          const cityName = response.data.name;
          const firstWordCityName = cityName.replace(/\d.*/, "");
          setFirstWordCityName(firstWordCityName);
          const logo = require("./assets/openweathermap/" +
            response?.data.weather[0].icon +
            ".svg");
          setLogo(logo);
        })
        .catch((err) => {
          console.error("Error:", err);
          setState("error");
          setError(err);
        });
    }
  }, [lat, long]);
  if (state === "error")
    return (
      <div>
        <h1>{error.toString()} </h1>
      </div>
    );
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="flex flex-col items-center bg-white rounded-xl shadow-md overflow-hidden">
        <div class="flex flex-row gap-2">
          {state === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            <h1>{firstWordCityName}</h1>
          )}
          <p>
            {dateState.toLocaleString("fr-FR", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </p>
        </div>

        {state === "loading" ? (
          <h1>Loading...</h1>
        ) : (
          <img class="w-24" alt="weather-icon" src={logo} />
        )}
        <div>03</div>
        {state === "loading" ? <h1>Loading...</h1> : <h1>{weather?.base}</h1>}
      </div>
    </div>
  );
}

export default App;

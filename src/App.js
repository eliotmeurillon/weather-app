import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import humidityLogo from "./assets/humidity.svg";
import windLogo from "./assets/wind.svg";
import pressureLogo from "./assets/barometer.svg";

function App() {
  const [weather, setWeather] = useState("null");
  const [weatherRound, setWeatherRound] = useState(null);
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
          const TempRound = Math.round(response.data.main.temp);
          setWeatherRound(TempRound);
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
    <div class="flex items-center justify-center h-screen bg-[#4A7DFF]">
      <div class=" bg-[#C9E5FF]/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
        <div class="flex flex-col  justify-center p-5 font-Jakarta text-[#658CAF] font-semibold">
          <div class="flex flex-row justify-between items-center">
            <div class="text-2xl bg-white/20 rounded-md shadow-sm p-2">
              {state === "loading" ? (
                <p>Loading...</p>
              ) : (
                <p>{firstWordCityName}</p>
              )}
            </div>
            <div class="text-2xl">
              <p>
                {dateState.toLocaleString("fr-FR", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
          <div class="flex flex-row items-center">
            {state === "loading" ? (
              <p class="text-2xl">Loading...</p>
            ) : (
              <img class="w-40" alt="weather-icon" src={logo} />
            )}
            <div class="flex flex-col">
              {state === "loading" ? (
                <p class="text-7xl">Loading...</p>
              ) : (
                <h1 class="text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
                  {weatherRound}°C
                </h1>
              )}
              {state === "loading" ? (
                <p>Loading...</p>
              ) : (
                <p class="text-lg ml-2">{weather?.weather?.[0].description}</p>
              )}
            </div>
          </div>
          <div class="flex flex-row gap-2 justify-around">
            <div class="flex flex-col items-center bg-white/20 rounded-md shadow-sm p-2">
              <img class="w-10" alt="humidity-icon" src={humidityLogo} />
              {state === "loading" ? (
                <p>Loading...</p>
              ) : (
                <p class="text-xl">{weather?.main?.humidity}%</p>
              )}
            </div>
            <div class="flex flex-col items-center bg-white/20 rounded-md shadow-sm p-2">
              <img class="w-10" alt="humidity-icon" src={windLogo} />
              {state === "loading" ? (
                <p>Loading...</p>
              ) : (
                <p class="text-xl">{weather?.main?.humidity}%</p>
              )}
            </div>
            <div class="flex flex-col items-center bg-white/20 rounded-md shadow-sm p-2">
              <img class="w-10" alt="humidity-icon" src={pressureLogo} />
              {state === "loading" ? (
                <p>Loading...</p>
              ) : (
                <p class="text-xl">{weather?.main?.humidity}%</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

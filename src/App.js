import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState("null");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [error, setError] = useState(false);
  const [state, setState] = useState("");

  const env_key = process.env.REACT_APP_MY_WEATHER_API_KEY;

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
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${env_key}`
        )
        .then((response) => {
          console.log(response.data);
          setState("success");
          setWeather(response.data);
        })
        .catch((err) => {
          console.error("Error:", err);
          setState("error");
          setError(err);
        });
    }
  }, [lat, long, env_key]);
  if (state === "error")
    return (
      <div>
        <h1>{error.toString()} </h1>
      </div>
    );
  return (
    <div>
      <div>
        {state === "loading" ? <h1>Loading...</h1> : <h1>{weather?.base}</h1>}
      </div>
    </div>
  );
}

export default App;

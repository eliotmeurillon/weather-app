import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //get geolocation data
  //   const [lat, setLat] = React.useState(null);
  //   const [long, setLong] = React.useState(null);
  //   const [error, setError] = React.useState(null);

  //   React.useEffect(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setLat(position.coords.latitude);
  //           setLong(position.coords.longitude);
  //         },
  //         (error) => {
  //           setError(error.message);
  //         }
  //       );
  //     } else {
  //       setError("Geolocation is not supported by this browser.");
  //     }
  //   }, []);

  //   //weather data api call
  //   const [weather, setWeather] = React.useState(null);
  //   const [loading, setLoading] = React.useState(false);
  //   const [error2, setError2] = React.useState(null);

  //   const API_KEY = process.env.MY_WEATHER_API_KEY;
  //   const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
  //   const [post, setPost] = React.useState(null);

  //   React.useEffect(() => {
  //     axios.get(baseURL).then((response) => {
  //       setPost(response.data);
  //     });
  //   }, []);

  //   if (!post) return null;

  //   // React.useEffect(() => {
  //   //   if (lat && long) {
  //   //     setLoading(true);
  //   //     fetch(
  //   //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
  //   //     )
  //   //       .then((res) => res.json())
  //   //       .then((data) => {
  //   //         setWeather(data);
  //   //         setLoading(false);
  //   //       })
  //   //       .catch((error) => {
  //   //         setError2(error.message);
  //   //         setLoading(false);
  //   //       });
  //   //   }
  //   // }, [lat, long]);

  //   return (
  //     <div class="flex items-center justify-center h-screen bg-gray-300">
  //       <div class="max-w-md bg-white rounded-xl shadow-lg shadow-blue-500/50 overflow-hidden md:max-w-2xl">
  //         <div class="md:flex">
  //           <div class="md:shrink-0">
  //             <img
  //               class="h-48 w-full object-cover md:h-full md:w-48"
  //               src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80"
  //               alt="Modern building architecture"
  //             />
  //           </div>
  //           <div class="p-8">
  //             <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
  //               Company retreats
  //             </div>
  //             <a
  //               href="https://www.google.com"
  //               class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
  //             >
  //               Incredible accomodation for your team
  //             </a>
  //             <p class="mt-2 text-slate-500">
  //               Looking to take your team away on a retreat to enjoy awesome food
  //               and take in some sunshine? We have a list of places to do just
  //               that.
  //             </p>
  //             <p class="mt-2 text-slate-500">
  //               Latitude: {lat}
  //               <h1>{post.title}</h1>
  //               <br />
  //               Longitude: {long}
  //               <br />
  //               Error: {error}
  //               <br />
  //               loading: {loading.toString()}
  //               <br />
  //               Error2: {error2}
  //               weather: {weather?.weather[0].description} <br />
  //               temp: {weather?.main.temp}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  const [catUrl, setCatUrl] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState("");
  useEffect(() => {
    setState("loading");
    axios
      .get("https://cataas.com/cat?json=true")
      .then((res) => {
        console.log(res);
        setState("success");
        setCatUrl("https://cataas.com" + res.data.url);
      })
      .catch((err) => {
        console.error("Error:", err);
        setState("error");
        setError(err);
      });
  }, []);
  if (state === "error") return <h1>{error.toString()}</h1>;
  return (
    <div>
      <div>
        {state === "loading" ? <h1>Loading...</h1> : <img src="{catUrl}" />}
      </div>
    </div>
  );
}

export default App;

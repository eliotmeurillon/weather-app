const process = require("process");

const axios = require("axios");
const qs = require("qs");

const handler = async function (event) {
  // apply our function to the queryStringParameters and assign it to a variable
  const lat = event.queryStringParameters;
  const lon = event.queryStringParameters;
  const API_PARAMS = qs.stringify(event.queryStringParameters);
  console.log("API_PARAMS", API_PARAMS, lat, lon);
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const API_SECRET = process.env.REACT_APP_MY_WEATHER_API_KEY;
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat.lat}&lon=${lon.lon}&APPID=${API_SECRET}`;

  console.log("Constructed URL is ...", URL);

  try {
    const { data } = await axios.get(URL);
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { data, headers, status, statusText } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };

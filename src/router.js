const weather = require("../utils/weather");
const geo = require("../utils/geocode");

const resultContainer = async (location) => {
  //this inside a method so arrow
  console.log(location);
  return new Promise((resolve, reject) => {
    geo
      .getGeo(location)
      .then((data) => {
        //console.log(data);
        console.log("got land and lat");

        return weather.getWeather(data[1], data[0]);
      })
      .then((data) => {
        console.log(data.current);
        console.log("promise executed and got temp");
        const forecast = data.current.weather_descriptions[0];
        const loc = data.location.name;
        console.log(forecast);
        resolve({
          forecast,
          loc,
        });
      })
      .catch((error) => {
        console.log(error);
        reject(error); // the bigger async will send this to server
      });
    //console.log(forecast);
  });
};

module.exports = { resultContainer };

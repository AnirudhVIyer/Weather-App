const request = require("postman-request");

const getWeather = async (lati, longi) => {
  console.log("triggered");
  return new Promise((resolve, reject) => {
    const api =
      "http://api.weatherstack.com/current?access_key=8c122c3128e1ddd924a9135c27f886e7&query=" +
      lati +
      "," +
      longi;

    request({ url: api, json: true }, (error, response) => {
      if (error) {
        console.log(error + "issue connecting"); // os issue
        reject(error + "issue connecting");
      } else if (response.body.error != null) {
        console.log("Bad Api"); //response given but bad api
        reject("Bad API");
      } else {
        console.log(response.body);
        resolve(response.body); // what my promise will return
      }
    });
  });
};

module.exports = { getWeather };

// await only works when a promise is returned, so can't use with request. rather put all of that in a new promise.

// getWeather("NY")
//   .then((data_ny) => {
//     console.log(data_ny.current.temperature);
//     console.log("promise executed 1");
//   })
//   .catch((error) => {
//     console.log("Issue");
//   });

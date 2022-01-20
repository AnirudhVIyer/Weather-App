const request = require("postman-request");

const getGeo = async (location) => {
  console.log("triggered");
  return new Promise((resolve, reject) => {
    const api =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      location +
      ".json?access_token=pk.eyJ1IjoiYW5pcjk5aXllciIsImEiOiJja3lpazRmenkxZ283MnZzODhkN3NndXp5In0.xMPDT0h7eOH4V8CXisWqxQ&limit=1";

    request({ url: api, json: true }, (error, response) => {
      if (error) {
        console.log(error + "issue connecting"); // os issue
        reject();
      } else if (response.body.error != null) {
        console.log("Bad Api"); //response given but bad api
        reject();
      } else if (response.body.features.length == 0) {
        const bad_add = "address not found"; // incorrect address
        reject(bad_add);
      } else {
        resolve(response.body.features[0].center); // what my promise will return
      }
    });
  });
};

module.exports = { getGeo };

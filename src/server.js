const { response } = require("express");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const router = require("./router");
const port = process.env.PORT || 3000;

const viewpath = path.join(__dirname, "/templates/views"); // customize views directory

const partialpath = path.join(__dirname, "/templates/partials");

// creating the path to a direclty holding public static files
const publicDir = path.join(__dirname, "../public");

const app = express();

//firing up.   Use app.use to serve files rather than app.get

// app.get("", (req, res) => {
//   res.send("<h1>Weather App</h1>"); //sending html
// });

app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);

app.use(express.static(publicDir)); // put this to access styles in public. make sure it doesnt have html files

// views inside root folder of server.js
app.get("", (req, res) => {
  res.redirect("/weather");
});

//for static-->  app.use(express.static(publicDir)); // can't use the other app.get as express confused which to serve

//help page

app.get("/help", (req, res) => {
  //   res.send([
  //     {
  //       name: "ani",
  //       age: 22,
  //     },
  //     {
  //       name: "suneel",
  //       age: 30,
  //     },
  //   ]); // sending js object automatically in json

  res.render("help", {
    title: "Help page",
    message: undefined,
  });
});

app.get("/about", (req, res) => {
  //   res.send("<h1>About </h1>");
  res.render("about", {
    title: "What's this About",
    message: undefined,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("weather", {
      title: "Weather App",
      Message: "Search Here",
    });
  }
  // if address given
  //   console.log(req.query.address);
  //   res.render("weather", {
  //     address: req.query.address,
  //     title: "Weather",
  //     message: "searching address",
  //   });

  router
    .resultContainer(req.query.address)
    .then((data) => {
      console.log("returned to main server");
      // res.render("weather", {
      //   forecast: data.forecast,
      //   address: req.query.address,
      // });
      //sending in json api endpoint
      res.send({
        forecast: data.forecast,
        address: data.loc,
      });
    })
    .catch((error) => {
      res.render("weather", {
        forecast: "Cannot Find Address",
        address: "Issue: " + error + "\n check API plan limit",
      });
    });
});

//404

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    message: "help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("up and running");
});

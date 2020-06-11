const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup static directory to serve
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Bhanuj Gandhi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Bhanuj Gandhi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is help text",
    title: "Help",
    name: "Bhanuj Gandhi",
  });
});

app.get("/weather", (req, res) => {
  res.send([
    {
      name: "Rahul",
      dialogue: "Naam toh suna hoga",
    },
    {
      name: "Raj",
      dialgue: "Tum nai smjhogi simran, Kuch kuch hota h",
    },
  ]);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
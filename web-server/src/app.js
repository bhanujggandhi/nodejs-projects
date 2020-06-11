const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
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

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

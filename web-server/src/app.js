const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("<h1>Hello express!</h1>");
});

app.get("/help", (req, res) => {
  res.send({
    name: "Bhanuj",
    age: 19,
  });
});

app.get("/about", (req, res) => {
  res.send("<code>This is about page</code>");
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

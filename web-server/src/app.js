const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

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

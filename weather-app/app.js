const request = require("request");

const url =
  "http://api.weatherapi.com/v1/current.json?key=7c932ced4d6b4d41acb85714200806&q=delhi";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.current);
});

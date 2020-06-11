const http = require("http");

const url =
  "http://api.weatherapi.com/v1/forecast.json?key=7c932ced4d6b4d41acb85714200806&q=panipat";

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error: " + error);
});

request.end();

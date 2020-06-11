const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=7c932ced4d6b4d41acb85714200806&q=" +
    encodeURIComponent(address);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(
        undefined,
        `It is ${
          response.body.forecast.forecastday[0].day.condition.text
        } outside in ${response.body.location.name} with ${
          response.body.current.temp_c
        } degrees currently. There is a ${
          response.body.current.precip_mm * 10
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

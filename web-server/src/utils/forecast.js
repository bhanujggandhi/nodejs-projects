const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=7c932ced4d6b4d41acb85714200806&q=" +
    encodeURIComponent(address);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      callback(undefined, {
        forecast: `It is ${
          body.forecast.forecastday[0].day.condition.text
        } outside in ${body.location.name} with ${
          body.current.temp_c
        } degrees currently. There is a ${
          body.current.precip_mm * 10
        }% chance of rain.`,
        location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
      });
    }
  });
};

module.exports = forecast;

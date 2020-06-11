const request = require("request");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
} else {
  forecast(process.argv[2].toString(), (error, data) => {
    if (error) return console.log(error);
    console.log(data);
  });
}

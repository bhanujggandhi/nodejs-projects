require("../src/db/mongoose");
const User = require("../src/models/user");

//5eee78243dc3a33c8c7ecedf

User.findByIdAndUpdate("5eee78243dc3a33c8c7ecedf", {
  age: 19,
})
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 19 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

require("../src/db/mongoose");
const Task = require("../src/models/task");

//5eee72c773241f22b4fc0786

Task.findByIdAndDelete("5eee72c773241f22b4fc0786")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

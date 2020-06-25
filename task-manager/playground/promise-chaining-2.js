require("../src/db/mongoose");
const Task = require("../src/models/task");

//5eee72c773241f22b4fc0786

// Task.findByIdAndDelete("5eee72c773241f22b4fc0786")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5eee7b1de662d4212004fdd7")
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });

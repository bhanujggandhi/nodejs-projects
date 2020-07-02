const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   if (req.method) {
//     res
//       .status(503)
//       .send(
//         "This site is in maintainance mode. Please try again after sometime"
//       );
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
// const task = await Task.findById("5efd0a04bb1df86a64081b0f");
// await task.populate("owner").execPopulate();
// console.log(task.owner);

//   const user = await User.findById("5efd098af3f21124e8967a55");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();

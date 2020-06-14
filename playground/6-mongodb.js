// CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id.id.length);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Dollar",
    //     age: 1,
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Priyanka",
    //       age: 24,
    //     },
    //     {
    //       name: "Ishita",
    //       age: 19,
    //     },
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       return console.log(err);
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Read 13 step to blood good luck",
    //       completed: true,
    //     },
    //     {
    //       description: "Cancel haridwar tour",
    //       completed: true,
    //     },
    //     {
    //       description: "Complete mongo db section",
    //       completed: false,
    //     },
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert the data");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5ee650a8072c4227e01b4ca8") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }

    //     console.log(user);
    //   }
    // );
    // db.collection("users")
    //   .find({ age: 19 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 19 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection("tasks").findOne(
    //   {
    //     _id: new ObjectID("5ee64a6ec1c81030b8da778a"),
    //   },
    //   (error, task) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: true })
    //   .toArray((error, task) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(task);
    //   });
  }
);

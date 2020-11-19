const request = require("supertest");
const app = require("../src/app");

test("should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Bhanuj",
      email: "bhanuj123@example.com",
      password: "MyPass777!",
    })
    .expect(201);
});

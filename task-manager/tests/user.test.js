const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

describe("SignUp Tests", () => {
  jest.setTimeout(10000);
  test("should signup a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Bhanuj",
        email: "bhanuj123@example.com",
        password: "MyPass777!",
        age: 20,
      })
      .expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertion about the response
    expect(response.body).toMatchObject({
      user: {
        name: "Bhanuj",
        email: "bhanuj123@example.com",
      },
      token: user.tokens[0].token,
    });

    // Asserting about not storing raw password
    expect(user.password).not.toBe("MyPass777!");
  });

  it("should not signup user with invalid name/email/password", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "abc",
        email: "abcn11",
        password: "MyPass777!",
        age: 20,
      })
      .expect(400);
  });
});

describe("Login Tests", () => {
  test("should login existing user", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const user = await User.findById(userOneId);

    expect(response.body.token).toBe(user.tokens[1].token);
  });

  it("should not login nonexistent user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: "userOne.password",
      })
      .expect(400);
  });
});

describe("Profile Tests", () => {
  it("should get profile for user", async () => {
    await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  it("should not get profile for unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
  });

  it("should delete account for user", async () => {
    await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const user = await User.findById(userOneId);

    expect(user).toBeNull();
  });

  it("should upload avatar image", async () => {
    await request(app)
      .post("/users/me/avatar")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .attach("avatar", "tests/fixtures/profile-pic.jpg")
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
  });

  it("should update valid user fields", async () => {
    await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: "Jake",
        age: 20,
      })
      .expect(200);

    const user = await User.findById(userOne._id);
    expect(user.name).toBe("Jake");
  });
});

describe("User Security Test", () => {
  it("should not delete account for unauthenticated user", async () => {
    await request(app).delete("/users/me").send().expect(401);
  });

  it("should not update invalid user fields", async () => {
    await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: "Jake",
        address: "Anywhere on planet",
      })
      .expect(400);
  });

  it("Should not update user if unauthenticated", async () => {
    await request(app)
      .patch("/users/me")
      .send({
        name: "Jake",
        age: 20,
      })
      .expect(401);
  });

  it("Should not update user with invalid name/email/password", async () => {
    await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: "Jake",
        age: "helo age",
      })
      .expect(400);
  });
});

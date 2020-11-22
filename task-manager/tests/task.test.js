const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userOneId,
  setupDatabase,
  taskOne,
  userTwo,
  userTwoId,
} = require("./fixtures/db");

beforeEach(setupDatabase);

describe("Task Operations", () => {
  jest.setTimeout(10000);
  it("should create task for user", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        description: "From my test",
      })
      .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
  });

  it("should get all tasks for the authenticated user", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response.body).toHaveLength(2);
  });
});

describe("Task Security", () => {
  it("should not deleted non-authorized task", async () => {
    await request(app)
      .delete(`/tasks/${taskOne._id}`)
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404);

    const task = Task.findById(taskOne._id);
    expect(task).not.toBeNull();
  });
});

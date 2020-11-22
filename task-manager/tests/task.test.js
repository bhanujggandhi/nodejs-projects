const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userOneId,
  setupDatabase,
  taskOne,
  taskTwo,
  taskThree,
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

  it("should get all tasks for the authenticated user", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response.body).toHaveLength(2);
  });

  it("should update the task for authenticated user", async () => {
    await request(app)
      .patch(`/tasks/${taskOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        completed: true,
      })
      .expect(200);

    const task = await Task.findById(taskOne._id);
    expect(task.completed).toBeTruthy();
  });

  it("Should delete user task", async () => {
    await request(app)
      .delete(`/tasks/${taskOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  it("Should fetch user task by id", async () => {
    await request(app)
      .get(`/tasks/${taskOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });
});

describe("Task Boundaries Checkup", () => {
  it("Should not create task with invalid description/completed", async () => {
    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        description: 1123,
        completed: "Invalid String",
      })
      .expect(400);
  });

  it("Should not update task with invalid description/completed", async () => {
    await request(app)
      .patch(`/tasks/${taskOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        completed: "hello hello",
      })
      .expect(400);
  });

  it("Should not update other users task", async () => {
    await request(app)
      .patch(`/tasks/${taskThree._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        completed: true,
      })
      .expect(404);
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

  it("Should not delete task if unauthenticated", async () => {
    await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);
  });

  it("Should not fetch user task by id if unauthenticated", async () => {
    await request(app).get(`/tasks/${taskOne._id}`).send().expect(401);
  });

  it("Should not fetch other users task by id", async () => {
    await request(app)
      .get(`/tasks/${taskOne._id}`)
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404);
  });
});

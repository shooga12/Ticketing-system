const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index"); // Importing App instance
const request = require("supertest")(app);
const expect = chai.expect;
const db = require("../src/models"); // Import your Sequelize instance

chai.use(chaiHttp);

describe("User API", () => {
  // Test the POST /users endpoint
  it("should creat a user", async () => {
    const response = await request
      .post("/api/users")
      .send({ name: "Khalid", email: "Khalid@gmail.com", role: "owner" });
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal("Khalid");
    expect(response.body.email).to.equal("Khalid@gmail.com");
    expect(response.body.role).to.equal("owner");
  });

  // Test the GET /users endpoint
  it("should get a list of all users", async () => {
    const response = await request.get("/api/users");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  // Test the GET /users/:id endpoint
  it("should get details of a specific user by id.", async () => {
    const userId = 1;
    const response = await request.get(`/api/users/${userId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.id).to.equal(userId);
  });

  // Test the PUT /users/:id endpoint
  it("should update user details", async () => {
    const userId = 1;
    const updatedData = {
      name: "Ahmed",
      email: "Ahmed@gmail.com",
      role: "requester",
    };

    const response = await request
      .put(`/api/users/${userId}`)
      .send(updatedData);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
  });

  // Test the DELETE /users/:id endpoint
  it("should delete a user", async () => {
    const userId = 1;

    const response = await request.delete(`/api/users/${userId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.equal("User deleted successfully!");
  });

  after(async () => {
    await db.sequelize.close(); // Close the Sequelize connection
  });
});

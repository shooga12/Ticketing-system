const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index"); // Importing App instance
const request = require("supertest")(app);
const expect = chai.expect;
const db = require("../src/models"); // Import your Sequelize instance

chai.use(chaiHttp);

describe("Ticket API", () => {
  // Setup the test database
  before(async () => {
    await db.sequelize.sync({ force: true }); // Clear and recreate tables

    await db.users.create({
      name: "John",
      email: "John@John.com",
      role: "owner",
    });
    await db.users.create({
      name: "Mohammed",
      email: "Mohammed@gmail.com",
      role: "owner",
    });

    await db.tickets.create({
      title: "Request1",
      description: "This is request 1",
      status: "opened",
      assignedTo: 1,
    });
    await db.tickets.create({
      title: "Request2",
      description: "This is request 2",
      status: "pending",
      assignedTo: 1,
    });
  });

  // Test the POST /tickets endpoint
  it("should creat a ticket", async () => {
    const response = await request.post("/api/tickets").send({
      title: "Request3",
      description: "This is request 3",
      status: "opened",
      assignedTo: 2,
    });
    expect(response.status).to.equal(200);
    expect(response.body.title).to.equal("Request3");
    expect(response.body.description).to.equal("This is request 3");
    expect(response.body.status).to.equal("opened");
    expect(response.body.assignedTo).to.equal(2);
  });

  // Test the GET /tickets endpoint
  it("should get a list of all tickets", async () => {
    const response = await request.get("/api/tickets");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  // Test the GET /tickets/:id endpoint
  it("should get details of a specific ticket by id.", async () => {
    const ticketId = 1;
    const response = await request.get(`/api/tickets/${ticketId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.id).to.equal(ticketId);
  });

  // Test the PUT /tickets/:id endpoint
  it("should update ticket details", async () => {
    const ticketId = 1;
    const updatedData = {
      title: "Request4",
      description: "This is request 4",
      status: "pending",
      assignedTo: 2,
    };

    const response = await request
      .put(`/api/tickets/${ticketId}`)
      .send(updatedData);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
  });

  // Test the DELETE /tickets/:id endpoint
  it("should delete a ticket", async () => {
    const ticketId = 1;

    const response = await request.delete(`/api/tickets/${ticketId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.equal("Ticket deleted successfully!");
  });
});

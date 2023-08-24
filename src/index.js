require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

require("./app/routes/user.routes")(app);
require("./app/routes/ticket.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

module.exports = app;

const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

//Create and save a new Ticket
exports.create = (request, response) => {
  // Validate request
  if (!request.body) {
    response.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  // Create a Ticket
  const ticket = {
    title: request.body.title,
    description: request.body.description,
    status: request.body.status,
    assignedTo: request.body.assignedTo,
  };

  // Save Ticket in the database
  Ticket.create(ticket)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket.",
      });
    });
};

// Retrieve all Tickets from the database.
exports.findAll = (request, response) => {
  const title = request.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Ticket.findAll({ where: condition, include: "user" })
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "Some error occurred while retrieving tickets.",
      });
    });
};

// Find a single Ticket with an id
exports.findOne = (request, response) => {
  const id = request.params.id;

  Ticket.findByPk(id, { include: ["user"] })
    .then((data) => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find Ticket with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      response.status(500).send({
        message: "Error retrieving Ticket with id=" + id,
      });
    });
};

// Update a Ticket by the id in the request
exports.update = (request, response) => {
  const id = request.params.id;

  Ticket.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "Ticket updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update Ticket with id=${id}. Ticket Maybe not found or request.body is empty!`,
        });
      }
    })
    .catch((err) => {
      response.status(500).send({
        message: "Error updating Ticket with id=" + id,
      });
    });
};

// Delete a Ticket with the specified id in the request
exports.delete = (request, response) => {
  const id = request.params.id;

  Ticket.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "Ticket deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete Ticket ith id=${id}. Maybe Ticket was not found!`,
        });
      }
    })
    .catch((err) => {
      response.status(500).send({
        message: "Could not delete Ticket with id=" + id,
      });
    });
};

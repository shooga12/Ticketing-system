const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (request, response) => {
  // Validate request
  if (!request.body) {
    response.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    name: request.body.name,
    email: request.body.email,
    role: request.body.role,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (request, response) => {
  const name = request.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition, include: "tickets" })
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (request, response) => {
  const id = request.params.id;

  User.findByPk(id, { include: ["tickets"] })
    .then((data) => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      response.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (request, response) => {
  const id = request.params.id;

  User.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "User was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update User with id=${id}. User Maybe not found or request.body is empty!`,
        });
      }
    })
    .catch((err) => {
      response.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (request, response) => {
  const id = request.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "User was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete User ith id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      response.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("Ticket", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "") {
            throw new Error("Please enter a title.");
          } else if (value.length < 3 || value.length > 20) {
            throw new Error(
              "Title length must be between 3 and 20 characters."
            );
          }
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "") {
            throw new Error("Description must be provided.");
          } else if (value.length < 10 || value.length > 150) {
            throw new Error(
              "Description length must be between 10 and 150 characters."
            );
          }
        },
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Requested",
      validate: {
        notEmpty: {
          msg: "Please provide a status for the ticket.",
        },
      },
    },
    assignedTo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      isNumeric: true,
      validate: {
        notEmpty: {
          msg: "Ticket must be assignedTo some user.",
        },
      },
    },
  });
  return Ticket;
};

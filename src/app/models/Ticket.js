module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("Ticket", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    assignedTo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Ticket;
};

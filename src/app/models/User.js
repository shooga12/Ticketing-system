module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === "") {
            throw new Error("Please enter your name.");
          } else if (value.length < 3 || value.length > 15) {
            throw new Error("Name length must be between 3 and 15 characters.");
          }
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "An account with the same email is already registered.",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email must be in proper form, John@John.com",
        },
        //msg: "Email must be in proper form, John@John.com.",
      },
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role must be provided.",
        },
      },
    },
  });

  return User;
};

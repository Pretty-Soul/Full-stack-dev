const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("signupsignindetails", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;

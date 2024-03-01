const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Music = require("./models/music.js")(sequelize, Sequelize.DataTypes);

module.exports = { Music };

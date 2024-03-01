const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "music",
    {
      title: Sequelize.STRING,
      artist: Sequelize.STRING,
      mood: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
  );
};

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list_music")
    .setDescription("Get all music"),
  async execute(interaction) {},
};

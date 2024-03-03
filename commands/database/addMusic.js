const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_music")
    .setDescription("Keep Most like Music")

    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("title of the song")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("artist")
        .setDescription("artist of the song")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("mood").setDescription("How you feel").setRequired(true)
    ),
  async execute(interaction) {},
};

const { Events } = require("discord.js");
const { Music } = require("../dbObjects.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "list_music") {
      // equivalent to: SELECT * FROM tags;
      const musicList = await Music.findAll({
        attributes: ["title", "artist"],
      });
      const musicString =
        musicList
          .map((music) => music.title + " de " + music.artist)
          .join(", ") || "music list is empty.";

      return interaction.reply(`List of music: ${musicString}`);
    }
  },
};

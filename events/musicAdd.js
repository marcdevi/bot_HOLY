const { Events } = require("discord.js");
const { Music } = require("../dbObjects.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "add_music") {
      const musicTitle = interaction.options.getString("title");
      const musicArtist = interaction.options.getString("artist");
      const musicMood = interaction.options.getString("mood");

      try {
   
        const music = await Music.create({
          title: musicTitle,
          artist: musicArtist,
          mood: musicMood,
        });

        return interaction.reply(`Music ${music.title} added.`);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          return interaction.reply("That music already exists.");
        }

        return interaction.reply("Something went wrong with adding a Music.");
      }
    }
  },
};

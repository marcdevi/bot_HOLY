const { Events } = require("discord.js");
const { Music } = require("../dbObjects.js");

module.exports = {
  name: Events.InteractionCreate,
   // Asynchronous function to execute when the event occurs
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

      // Extract the command name from the interaction
    const { commandName } = interaction;

    if (commandName === "list_music") {
    
       // Retrieve the list of music from the database
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

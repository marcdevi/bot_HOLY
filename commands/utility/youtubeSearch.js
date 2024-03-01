const { SlashCommandBuilder } = require("discord.js");
const search = require("youtube-search");
const { config } = require("../../config.json");

const opts = {
  maxResults: 1,
  key: "AIzaSyAhm9vT2xvYjYj-o20p7jzg2lUBUvsY6HE",
  type: "video",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("song_search")
    .setDescription("search a song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("song of the search")
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString("song");
    await interaction.reply(`you searched for : ${query}`);
    let results = await search(query, opts).catch((err) => console.log(err));

    if (results) {
      let youtubeResults = results.results;

      let i = 0;
      let titles = youtubeResults.map((result) => {
        i++;
        return `${i}) ${result.title}: ${result.link}`;
      });
      const messages = titles.join("\n");
      await interaction.followUp(messages);
      console.log(titles.join("\n"));
    }
  },
};

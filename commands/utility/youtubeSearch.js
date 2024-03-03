const { SlashCommandBuilder } = require("discord.js");
const search = require("youtube-search");


// YouTube search options
const opts = {
  maxResults: 1,
  key: "AIzaSyAhm9vT2xvYjYj-o20p7jzg2lUBUvsY6HE",
  type: "video",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("song_search")
    .setDescription("Search for a song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Song for the search")
        .setRequired(true)
    ),
  async execute(interaction) {
     // Get the song title from the command's options
    const query = interaction.options.getString("song");
    await interaction.reply(`You searched for : ${query}`);
    let results = await search(query, opts).catch((err) => console.log(err));

    if (results) {
      let youtubeResults = results.results;
       // Format the search results into a string
      let i = 0;
      let titles = youtubeResults.map((result) => {
        i++;
        return `${i}) ${result.title}: ${result.link}`;
      });
      // Join the formatted titles into a single string
      const messages = titles.join("\n");
      // Reply to the interaction with the search results
      await interaction.followUp(messages);
      console.log(titles.join("\n"));
    }
  },
};

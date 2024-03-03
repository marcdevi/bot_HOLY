const { SlashCommandBuilder } = require("discord.js");
const search = require("youtube-search");
const { Music } = require("../../dbObjects.js"); 


const opts = {
  maxResults: 1,
  key: "AIzaSyAhm9vT2xvYjYj-o20p7jzg2lUBUvsY6HE", 
  type: "video",
};

module.exports = {
    data: new SlashCommandBuilder()
      .setName("my_favorite_list")
      .setDescription("Search for a song "),
    async execute(interaction) {
      try {
        await interaction.deferReply({ ephemeral: true });
  
        // Retrieve all songs from the database
        const allMusic = await Music.findAll();

        if (allMusic.length === 0) {
          return interaction.editReply("No songs found in the database.");
        }
  
        // Initialize an array to store the results
        const searchResults = [];
  
        // Iterate through each song and search on YouTube
        for (const music of allMusic) {
          const youtubeQuery = `${music.title} ${music.artist}`;
          const results = await search(youtubeQuery, opts).catch((err) => console.error(err));
  
          if (results && results.results.length > 0) {
            const topResult = results.results[0];
            searchResults.push({
              title: music.title,
              link: topResult.link,
            });
          }
        }
  
        // Prepare and send the response
        if (searchResults.length > 0) {
          const formattedResults = searchResults
            .map((result) => `${result.title}: ${result.link}`)
            .join("\n");
          await interaction.editReply(`Your favorite song list on youtube:\n${formattedResults}`);
        } else {
          await interaction.editReply("No search results found on YouTube.");
        }
      } catch (error) {
        console.error("Error searching for songs:", error);
        await interaction.editReply("An error occurred while searching for songs.");
      }
    },
  };
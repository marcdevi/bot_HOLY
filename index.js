// Import required packages & token
const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const Sequelize = require("sequelize");
const Player = require("discord-player");

//connexion DB
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

//creation table tags
const Tags = sequelize.define("tags", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: Sequelize.TEXT,
  username: Sequelize.STRING,
  usage_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

// Create a new client to run the bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const triggerWords = ["Nicolas", "Nico", "Triau"];

client.on("messageCreate", (message) => {
  if (message.author.bot) return false;

  triggerWords.forEach((word) => {
    if (message.content.includes(word)) {
      message.reply("Est un déchet");
    }
  });

  if (message.author.id == 142335378064408585) {
    message.reply("Ta gueule");
  }
});

// Create a command collection
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

//Lier une event et une commande
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  if (commandName === "db_test") {
    const tagName = interaction.options.getString("name");
    const tagDescription = interaction.options.getString("description");

    try {
      // equivalent to: INSERT INTO tags (name, description, username) values (...)
      const tag = await Tags.create({
        name: tagName,
        description: tagDescription,
        username: interaction.user.username,
      });
      return interaction.reply(`Tag ${tag.name} added.`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return interaction.reply("that tag already exists.");
      }
      console.log(error);
      return interaction.reply("Something went wrong with adding a tag.");
    }
  }
});

// Get the individual commands from their respective subfolder inside "commands"
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Get the events from the "event" folder
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
    if (event.name == Events.ClientReady) {
      Tags.sync();
    }
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);

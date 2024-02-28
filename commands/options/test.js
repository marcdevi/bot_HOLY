const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ADD DB TEST")
    .setDescription("Ajouter un élément a la base de données")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("le nom de l'utilisateur")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("la description de l'utilisateur")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.reply({
      content: "Saucisse potentiellement privée",
      ephemeral: interaction.options.getBoolean("ephemeral"),
    });
  },
};

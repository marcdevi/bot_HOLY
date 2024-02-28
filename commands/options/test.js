const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("db_test")
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
  async execute(interaction) {},
};

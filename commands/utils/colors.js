const { SALON_BOT, ROLE_COLOR } = require("../../config.js");

module.exports.help = {
  name: "colors",
  description: "Donne la liste des couleurs",
  category: "utils",
  onlyChannel: true,
  channel: SALON_BOT,
  args: false,
  usage: "",
  usePerm: false,
  permission: "",
};

module.exports.run = (client, message, args) => {
  message.channel.send(
    `Voici la liste des couleurs: https://cdn.discordapp.com/attachments/711657761263452210/711667355100381184/Couleurs.jpg`
  );
  message.delete();
};

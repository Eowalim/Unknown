const { SALON_BOT, ROLE_COLOR } = require("../../config.js");

module.exports.help = {
  name: "color",
  description:
    "Ajoute une couleur au pseudo de l'utilisateur en fonction d'un rôle",
  category: "utils",
  onlyChannel: true,
  channel: SALON_BOT,
  args: true,
  usage: "nameOfColor",
  usePerm: false,
  permission: "",
};

module.exports.run = (client, message, args) => {
  const tabRoleColor = ROLE_COLOR;

  //Choix de la couleur
  var exist = false;
  var colorChoose = args.join(" ");

  //Couleur si il en a déjà une
  var hasAlreadyColor = false;
  var nameOfAlreadyColor;

  //Parcours la liste des roles de couleurs
  tabRoleColor.forEach((color) => {
    //Check de la couleur demandé, voir si celle ci existe
    if (
      color === colorChoose ||
      color.toLowerCase() === colorChoose.toLowerCase()
    ) {
      exist = true;
      colorChoose = color;
    }

    //Check si il a déjà une couleur
    if (
      message.guild
        .member(message.author)
        .roles.cache.some((role) => role.name === color)
    ) {
      hasAlreadyColor = true;
      nameOfAlreadyColor = color;
    }
  });

  if (exist) {
    colorRole();
  } else {
    message.reply("cette couleur n'existe pas.");
  }

  function colorRole() {
    var newRole;
    var ancientRole;

    message.guild.roles.cache.forEach((role) => {
      if (role.name == colorChoose) {
        newRole = role;
      }

      if (hasAlreadyColor && role.name === nameOfAlreadyColor) {
        ancientRole = role;
      }
    });

    if (hasAlreadyColor) {
      if (newRole === ancientRole) {
        message.reply(`tu as déjà la couleur **${ancientRole.name}**.`);
      } else {
        message.guild.member(message.author).roles.remove(ancientRole);
        message.guild.member(message.author).roles.add(newRole);
        message.reply(
          `tu as changé la couleur **${nameOfAlreadyColor}** pour **${colorChoose}**.`
        );
      }
    } else {
      message.guild.member(message.author).roles.add(newRole);
      message.reply(`tu as la couleur **${colorChoose}**.`);
    }
  }
  message.delete();
};

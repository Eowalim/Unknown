const { MessageEmbed } = require("discord.js");
const { SALON_BOT, STAFF, BOT } = require("../../config.js");

module.exports.help = {
  name: "user",
  description: "Envoie les informations d'un untilisatuer mentionné.",
  category: "misc",
  onlyChannel: true,
  channel: SALON_BOT,
  args: true,
  usage: "@utilisateur",
  usePerm: false,
  permission: "",
};

module.exports.run = (client, message, args) => {
  message.delete();
  const userMention = message.mentions.users.first();
  const memberMention = message.mentions.members.first();

  const roles = fillTabRole();

  const embed = new MessageEmbed()
    .setColor("#6ab04c")
    .setTitle(`${userMention.tag}`)
    .setDescription(`<@${userMention.id}>`)
    .setThumbnail(`${userMention.displayAvatarURL()}`)
    .addFields(
      {
        name: `Arrivée sur ${message.guild.name}`,
        value: `${memberMention.joinedAt.toDateString()}`,
        inline: true,
      },
      {
        name: "Compte crée",
        value: `${userMention.createdAt.toDateString()}`,
        inline: true,
      },
      { name: "Statut", value: `${checkStatut()}`, inline: true },
      {
        name: `Roles[${roles.length}]`,
        value: `${checkRole()}`,
        inline: false,
      }
    )
    .setFooter(`ID: ${userMention.id}`);

  message.channel.send(embed);

  function fillTabRole() {
    const arrayRole = [];
    memberMention.roles.cache.forEach((role) => {
      if (role.name != "@everyone") {
        arrayRole.push(`<@&${role.id}> `);
      }
    });
    return arrayRole;
  }

  function checkRole() {
    var finalRole = "N'a pas de rôle !";
    if (roles.length != 0) {
      finalRole = roles.join("");
    }
    return finalRole;
  }

  function checkStatut() {
    var finalStatut = "Membre";
    memberMention.roles.cache.forEach((role) => {
      if (role.id === STAFF) {
        finalStatut = "Modérateur";
      } else if (role.id === BOT) {
        finalStatut = "BOT";
      }
    });
    return finalStatut;
  }
};

const { MessageEmbed } = require("discord.js");
const { SALON_BOT, STAFF } = require("../../config.js");

module.exports.help = {
  name: "infos",
  description: "Envoie les informations du discord.",
  category: "misc",
  onlyChannel: true,
  channel: SALON_BOT,
  args: false,
  usage: "",
  usePerm: false,
  permission: "",
};

module.exports.run = (client, message, args) => {
  message.delete();
  var fs = require("fs");
  var obj = JSON.parse(
    fs.readFileSync(
      "C:\\Users\\eowal\\Desktop\\Développement\\BOT Discord\\Unknown\\test.json",
      "utf8"
    )
  );
  console.log(obj.raidMode);

  let raideOn = { raideMode: true };
  let data = JSON.stringify(raideOn, null, 2);
  fs.writeFile(
    "C:\\Users\\eowal\\Desktop\\Développement\\BOT Discord\\Unknown\\test.json",
    data,
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );

  const embed = new MessageEmbed()
    .setColor("#f0932b")
    .setTitle(`${message.guild.name}`)
    .setThumbnail(`${message.guild.iconURL()}`)
    .addFields(
      {
        name: "Crée le",
        value: `${message.guild.createdAt.toDateString()}`,
        inline: true,
      },
      {
        name: "Fondateur",
        value: `${message.guild.owner.user.username}`,
        inline: true,
      },
      {
        name: "Membres",
        value: `${message.guild.memberCount}`,
        inline: true,
      },
      {
        name: "Staff",
        value: `${getStaff().join("")}`,
        inline: false,
      }
    )
    .setFooter(`Auteur: ${message.author.username}`);

  message.channel.send(embed);

  function getStaff() {
    var staff = [];
    message.guild.members.cache.forEach((mbr) => {
      if (mbr.roles.cache.some((role) => role.id === STAFF)) {
        staff.push(`- ${mbr.user.username}\n`);
      }
    });
    return staff;
  }
};

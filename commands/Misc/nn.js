const { MessageEmbed } = require("discord.js");
const { SALON_BOT } = require("../../config.js");

module.exports.help = {
  name: "nn",
  description: "Donne la liste des pseudos par lequel l'utilisateur est passé.",
  category: "misc",
  onlyChannel: true,
  channel: SALON_BOT,
  args: true,
  usage: "@utilisateur",
  usePerm: false,
  permission: "",
};

module.exports.run = (client, message, args) => {
  const userMention = message.mentions.users.first();

  fillNN(userMention.username);

  function fillNN(user) {
    const tabF = [];
    const fs = require("fs");
    const path = "./files/logNickname.json";

    fs.readFile(path, (err, data) => {
      if (err) throw err;
      let nn = JSON.parse(data);
      const checkUser = nn[user];

      if (checkUser === undefined) {
        tabF.push(
          "Cette utilisateur n'as pas changé de pseudos sur ce discord."
        );
        sendEmbed2(tabF);
      } else {
        var tab = nn[user];
        for (let i = 0; i < tab.length; i++) {
          tabF.push(`- ${tab[i]}\n`);
        }
        sendEmbed(tabF);
      }
    });
  }

  function sendEmbed(pseudos) {
    const embed = new MessageEmbed()
      .setColor("#0097e6")
      .setTitle(`${userMention.username}`)
      .setThumbnail(`${userMention.displayAvatarURL()}`)
      .addFields({
        name: `Liste de ses pseudos[${pseudos.length}]`,
        value: `${pseudos.join("")}`,
        inline: true,
      })
      .setFooter(`Auteur: ${message.author.username}`);

    message.channel.send(embed);
  }

  function sendEmbed2(pseudos) {
    const embed = new MessageEmbed()
      .setColor("#0097e6")
      .setTitle(`${userMention.username}`)
      .setThumbnail(`${userMention.displayAvatarURL()}`)
      .addFields({
        name: `Aucun`,
        value: `${pseudos.join("")}`,
        inline: true,
      })
      .setFooter(`Auteur: ${message.author.username}`);

    message.channel.send(embed);
  }
  message.delete();
};

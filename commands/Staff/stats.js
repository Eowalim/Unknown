const { MessageEmbed } = require("discord.js");
const { STAFF, SALON_STATS } = require("../../config.js");

module.exports.help = {
  name: "stats",
  description: "Envois les statique du jours",
  category: "staff",
  onlyChannel: true,
  channel: SALON_STATS,
  args: false,
  usage: "",
  usePerm: true,
  permission: STAFF,
};

module.exports.run = (client, message, args) => {
  const fs = require("fs");
  const path = "./files/stats.json";

  fs.readFile(path, (err, data) => {
    if (err) throw err;
    let stats = JSON.parse(data);

    const join = stats.join;
    const quit = stats.quit;
    const acceptRule = stats.acceptRule;
    sendStats(join, quit, acceptRule);
  });

  function sendStats(join, quit, acceptRule) {
    const embed = new MessageEmbed()
      .setColor("#6ab04c")
      .setTitle(`📊 Statistique`)
      .addFields(
        {
          name: `Join`,
          value: `${join}`,
          inline: true,
        },
        {
          name: "Quit",
          value: `${quit}`,
          inline: true,
        },
        {
          name: `Accepted Rules`,
          value: `${acceptRule}`,
          inline: true,
        }
      )
      .setFooter(`Statistique du ${new Date().toLocaleString()}`);

    client.channels.cache.get(SALON_STATS).send(embed);
    reinitilize();
  }

  function reinitilize() {
    let newMode = {
      join: 0,
      quit: 0,
      acceptRule: 0,
    };
    let data = JSON.stringify(newMode, null, 2);
    fs.writeFile(path, data, (err) => {
      if (err) throw err;
    });
  }

  msg.delete();
};

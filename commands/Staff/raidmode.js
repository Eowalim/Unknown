const { MessageEmbed } = require("discord.js");
const { STAFF, LOGS } = require("../../config.js");

module.exports.help = {
  name: "raidmode",
  description: "Permet d'activer ou désactiver le raid mode",
  category: "staff",
  onlyChannel: false,
  channel: "",
  args: false,
  usage: "",
  usePerm: true,
  permission: STAFF,
};

module.exports.run = (client, message, args) => {
  const fs = require("fs");
  const path = "./files/antiRaid.json";

  var value;

  fs.readFile(path, (err, data) => {
    if (err) throw err;
    let raid = JSON.parse(data);
    changeMode(raid.raidMode);
  });

  function changeMode(actualMode) {
    value = !actualMode;
    let newMode = { raidMode: value };
    let data = JSON.stringify(newMode, null, 2);
    fs.writeFile(path, data, (err) => {
      if (err) throw err;
    });

    var mode;
    var color;
    if (value) {
      color = "#6ab04c";
      mode = "activé";
    } else {
      color = "#ff5252";
      mode = "désactivé";
    }

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(
        `:information_source: **Le mode raid a été ${mode} par ${message.author.username}.**`
      );
    message.guild.channels.cache.forEach((channel) => {
      if (channel.name == LOGS) {
        client.channels.cache.get(channel.id).send(embed);
      }
    });

    message.delete();
  }
};

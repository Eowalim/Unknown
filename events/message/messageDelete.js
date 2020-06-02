const { MessageEmbed } = require("discord.js");
const { LOGS } = require("../../config.js");

module.exports = (client, msg) => {
  if (msg.author === null) return;
  if (msg.author.bot) return;
  if (msg.type === undefined) return;

  if (msg.attachments.size > 0) {
    generateEmbed("files", fillFileTab(), msg.content);
  } else {
    if (msg.content === "") return;
    generateEmbed("normal", null, msg.content);
  }

  function fillFileTab() {
    const fileTAb = [];
    msg.attachments.forEach((f) => {
      fileTAb.push(`[Fichier](${f.url})`);
    });

    return fileTAb;
  }
  function generateEmbed(type, files, content) {
    const embed = new MessageEmbed()
      .setColor("#ff5252")
      .setTitle(`${msg.author.tag}`)
      .setDescription(`Supression d'un message dans <#${msg.channel.id}>.`)
      .addFields({
        name: "Message supprimé:",
        value: `${generateContent(type, files, content)}`,
        inline: false,
      })
      .setFooter("Bot: Unknown");
    send(embed);
  }

  function generateContent(type, files, content) {
    var str;
    switch (type) {
      case "normal":
        str = `${content}`;
        break;
      case "files":
        str = `${content}\n${files.toString()}`;
        break;
    }
    return str;
  }

  function send(embed) {
    msg.guild.channels.cache.forEach((channel) => {
      if (channel.name == LOGS) {
        client.channels.cache.get(channel.id).send(embed);
      }
    });
  }
};

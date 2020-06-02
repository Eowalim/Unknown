const { MessageEmbed } = require("discord.js");
const { LOGS } = require("../../config.js");

module.exports = (client, newMessage, oldMessage) => {
  if (newMessage.content === oldMessage.content) return;
  if (newMessage.author === null) return;
  if (newMessage.author.bot) return;
  if (newMessage.type === undefined) return;

  if (oldMessage.attachments.size > 0) {
    generateEmbed("files", fillFileTab());
  } else {
    if (oldMessage.content === "") return;
    generateEmbed("normal", null);
  }

  function fillFileTab() {
    const fileTAb = [];
    oldMessage.attachments.forEach((f) => {
      fileTAb.push(`[Fichier](${f.url})`);
    });

    return fileTAb;
  }
  function generateEmbed(type, files) {
    const embed = new MessageEmbed()
      .setColor("#34ace0")
      .setTitle(`${newMessage.author.tag}`)
      .setDescription(
        `Modification d'un [message](${newMessage.url}) dans <#${newMessage.channel.id}>.`
      )
      .addFields(
        {
          name: "Avant:",
          value: `${generateContent(2, type, files)}`,
          inline: false,
        },
        {
          name: "Après:",
          value: `${generateContent(1, type, files)}`,
          inline: false,
        }
      )
      .setFooter("Bot: Unknown");

    send(embed);
  }

  function generateContent(mode, type, files) {
    var str;
    switch (mode) {
      case 1:
        switch (type) {
          case "normal":
            str = `${oldMessage.content}`;
            break;
          case "files":
            str = `${oldMessage.content}\n${files.toString()}`;
            break;
        }
        break;

      case 2:
        switch (type) {
          case "normal":
            str = `${newMessage.content}`;
            break;
          case "files":
            str = `${newMessage.content}\n${files.toString()}`;
            break;
        }
        break;
    }

    return str;
  }

  function send(embed) {
    newMessage.guild.channels.cache.forEach((channel) => {
      if (channel.name == LOGS) {
        client.channels.cache.get(channel.id).send(embed);
      }
    });
  }
};

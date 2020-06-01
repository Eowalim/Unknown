const { MessageEmbed } = require("discord.js");
const { LOGS } = require("../../config.js");

module.exports = (client, newMessage, oldMessage) => {
  if (msg.author === null) return;
  if (msg.type === undefined) return;
  if (newMessage.content === oldMessage.content) return;

  const embed = new MessageEmbed()
    .setColor("#34ace0")
    .setTitle(`${newMessage.author.tag}`)
    .setDescription(
      `Modification d'un [message](${newMessage.url}) dans <#${newMessage.channel.id}>.`
    )
    .addFields(
      {
        name: "Avant:",
        value: `${newMessage.content}`,
        inline: false,
      },
      {
        name: "Après:",
        value: `${oldMessage.content}`,
        inline: false,
      }
    )
    .setFooter("Bot: Unknown");

  newMessage.guild.channels.cache.forEach((channel) => {
    if (channel.name == LOGS) {
      client.channels.cache.get(channel.id).send(embed);
    }
  });
};

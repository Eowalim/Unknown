const { MessageEmbed } = require("discord.js");
const { LOGS } = require("../../config.js");

module.exports = (client, msg) => {
  if (msg.author === null) return;
  if (msg.author.bot) return;
  if (msg.type === undefined) return;

  const embed = new MessageEmbed()
    .setColor("#ff5252")
    .setTitle(`${msg.author.tag}`)
    .setDescription(`Supression d'un message dans <#${msg.channel.id}>.`)
    .addFields({
      name: "Message supprimé:",
      value: `${msg.content}`,
      inline: false,
    })
    .setFooter("Bot: Unknown");

  msg.guild.channels.cache.forEach((channel) => {
    if (channel.name == LOGS) {
      client.channels.cache.get(channel.id).send(embed);
    }
  });
};

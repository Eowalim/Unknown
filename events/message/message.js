const { PREFIX } = require("../../config");

module.exports = (client, msg) => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
  const args = msg.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.help.onlyChannel && msg.channel.id != command.help.channel) {
    let goodChannel = "";
    msg.guild.channels.cache.forEach((chan) => {
      if (chan.id === command.help.channel) {
        goodChannel = chan.name;
      }
    });
    return msg.channel.send(
      `${msg.author}, la commande n'est permisse que dans le salon ${goodChannel}`
    );
  }

  if (
    command.help.usePerm &&
    !msg.guild
      .member(msg.author)
      .roles.cache.some((role) => role.id === command.help.permission)
  ) {
    return msg.channel.send(
      `${msg.author}, tu n'as pas la permission requise pour exécuter cette commande !`
    );
  }

  if (command.help.args && !args.length) {
    let noArgsReplay = `${msg.author}, la commande est: \`${PREFIX}${command.help.name} ${command.help.usage}\``;
    return msg.channel.send(noArgsReplay);
  }
  command.run(client, msg, args);
};

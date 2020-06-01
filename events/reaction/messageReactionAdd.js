const { RULE, SALON_RULE } = require("../../config.js");

module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji.name;
  const channel = message.guild.channels.cache.find((c) => c.id === SALON_RULE);

  const fs = require("fs");
  const pathStats = "./files/stats.json";

  if (member.user.bot) return;

  if (messageReaction.partial) {
    await messageReaction.fetch();
    return;
  }

  if (
    emoji === "✅" &&
    message.channel.id === channel.id &&
    message.id === RULE
  ) {
    fs.readFile(pathStats, (err, data) => {
      if (err) throw err;
      let stats = JSON.parse(data);
      const join = stats.join;
      const quit = stats.quit;
      const acceptRule = stats.acceptRule;
      addAcceptRule(join, quit, acceptRule);
    });
  }

  function addAcceptRule(join, quit, acceptRule) {
    let newMode = {
      join: join,
      quit: quit,
      acceptRule: acceptRule + 1,
    };
    let data = JSON.stringify(newMode, null, 2);
    fs.writeFile(pathStats, data, (err) => {
      if (err) throw err;
    });
  }
};

const { SERVER, LOGS } = require("../../config");

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  checkChannelLogs();

  function checkChannelLogs() {
    var exist = false;
    var server = null;
    client.guilds.cache.forEach((guilds) => {
      if (guilds.id == SERVER) {
        server = guilds;
      }
    });

    server.channels.cache.forEach((channel) => {
      if (channel.name == LOGS) {
        exist = true;
      }
    });

    if (!exist) {
      server.channels.create(LOGS);
    }
  }
};

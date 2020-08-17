const { SERVER } = require("../../config.js");

module.exports = (client, member) => {
  const fs = require("fs");
  const path = "./files/antiRaid.json";
  const pathStats = "./files/stats.json";

  //
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    let raid = JSON.parse(data);
    check(raid.raidMode);
  });

  function check(mode) {
    var server = null;
    client.guilds.cache.forEach((guilds) => {
      if (guilds.id == SERVER) {
        server = guilds;
      }
    });

    if (mode) {
      server.member(member).kick();
    }
  }
};

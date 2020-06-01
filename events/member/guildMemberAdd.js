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
    } else {
      fs.readFile(pathStats, (err, data) => {
        if (err) throw err;
        let stats = JSON.parse(data);
        const join = stats.join;
        const quit = stats.quit;
        const acceptRule = stats.acceptRule;
        addJoin(join, quit, acceptRule);
      });
    }
  }

  function addJoin(join, quit, acceptRule) {
    let newMode = {
      join: join + 1,
      quit: quit,
      acceptRule: acceptRule,
    };
    let data = JSON.stringify(newMode, null, 2);
    fs.writeFile(pathStats, data, (err) => {
      if (err) throw err;
    });
  }
};

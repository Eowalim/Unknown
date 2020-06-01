const { SERVER } = require("../../config.js");

module.exports = (client, member) => {
  const fs = require("fs");
  const pathStats = "./files/stats.json";

  fs.readFile(pathStats, (err, data) => {
    if (err) throw err;
    let stats = JSON.parse(data);
    const join = stats.join;
    const quit = stats.quit;
    const acceptRule = stats.acceptRule;
    addRemove(join, quit, acceptRule);
  });

  function addRemove(join, quit, acceptRule) {
    let newMode = {
      join: join,
      quit: quit + 1,
      acceptRule: acceptRule,
    };
    let data = JSON.stringify(newMode, null, 2);
    fs.writeFile(pathStats, data, (err) => {
      if (err) throw err;
    });
  }
};

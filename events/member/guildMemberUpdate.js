const { OUF_MALADE } = require("../../config.js");

module.exports = (client, guildMemberUpdate) => {
  const fs = require("fs");
  const path = "./files/logNickname.json";

  //Changement de pseudos

  fs.readFile(path, (err, data) => {
    if (err) throw err;
    let nn = JSON.parse(data);

    const user = guildMemberUpdate.user.username;
    const checkUser = nn[user];

    if (checkUser === undefined) {
      writeInJSON(user, nn, false);
    } else {
      writeInJSON(user, nn, true);
    }
  });

  function writeInJSON(user, nn, exist) {
    if (exist) {
      const allNickName = nn[user];
      allNickName.push(guildMemberUpdate.nickname);
      nn[user] = allNickName;
    } else {
      nn[user] = [user];
    }

    let data = JSON.stringify(nn, null, 2);
    fs.writeFile(path, data, (err) => {
      if (err) throw err;
    });
  }

  //Detect rôle ouf malade
  const pathStats = "./files/stats.json";
  if (guildMemberUpdate.roles.cache.some((role) => role.id === OUF_MALADE)) {
    return;
  } else {
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

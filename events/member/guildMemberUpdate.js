module.exports = (client, guildMemberUpdate) => {
  const fs = require("fs");
  const path = "./files/logNickname.json";

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
};

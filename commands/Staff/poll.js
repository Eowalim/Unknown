const { MessageEmbed } = require("discord.js");
const { STAFF } = require("../../config.js");

module.exports.help = {
  name: "poll",
  description: "Permet de créer un sondage",
  category: "staff",
  onlyChannel: false,
  channel: "",
  args: true,
  usage: "question !rep1 !rep2 !rep3 ... (max 10)",
  usePerm: true,
  permission: STAFF,
};

module.exports.run = (client, message, args) => {
  const str = args.join(" ");

  const reponses = str.split("!");
  const emoji = [
    "0️⃣",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "8️⃣",
    "🔟",
  ];

  let question = reponses[0];
  const rep = [];

  if (reponses.length != 3) {
    for (let i = 1; i < reponses.length; i++) {
      rep.push(`\n${emoji[i]} : ${reponses[i]}`);
    }
  } else {
    rep.push(`\n✅ : ${reponses[1]}`);
    rep.push(`\n❌ : ${reponses[2]}`);
  }

  if (reponses.length < 11) {
    const embed = new MessageEmbed()
      .setColor("#6ab04c")
      .setTitle("Sondage")
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .addFields(
        {
          name: `Question`,
          value: `${question}`,
          inline: false,
        },
        {
          name: "Réponses",
          value: `${rep.join("")}`,
          inline: false,
        }
      )
      .setFooter(`Sondage crée par: ${message.author.username}`);

    message.channel.send(embed).then((message) => {
      for (let i = 1; i < reponses.length; i++) {
        if (reponses.length != 3) {
          message.react(emoji[i]);
        } else {
          message.react("✅");
          message.react("❌");
        }
      }
    });
  } else {
    message.reply("tu ne peux pas mettre plus de 10 réponses.");
  }
  message.delete();
};

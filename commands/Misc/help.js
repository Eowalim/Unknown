const { MessageEmbed } = require("discord.js");
const { SALON_BOT, PREFIX } = require("../../config.js");

module.exports.help = {
  name: "help",
  description: "Envoie la fiche du BOT.",
  category: "misc",
  onlyChannel: true,
  channel: SALON_BOT,
  args: false,
  usage: "",
  usePerm: false,
  permission: "",
};

module.exports.run = (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#F97F51")
    .setTitle(`:pushpin: Aide ${client.user.username}`)
    .setDescription(`:round_pushpin: Préfix: **${PREFIX}**`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
    .addFields(
      {
        name: ":no_entry: Commandes pour le staff",
        value: `\`${PREFIX}raidmode\`: Permet d'activer ou désactiver le mode raid (empêche l'arrivée de nouveau membre).\n\`${PREFIX}pool question !rep1 !rep2 ...(max 10)\`: Permet de créer un sondage.`,
        inline: false,
      },
      {
        name: ":page_facing_up: Commandes d'informations",
        value: `\`${PREFIX}help\`: Donne la fiche du BOT.\n\`${PREFIX}infos\`: Donne les informations du discord.\n\`${PREFIX}user @utilisateur\`: Donne les informations d'un utilisateur.\n\`${PREFIX}nn @utilisateur\`: Donne la liste des pseudos par lequel l'utilisateur est passé.`,
        inline: false,
      },
      {
        name: ":paperclip: Autres commandes",
        value: `\`${PREFIX}colors\`: Avoir la liste des couleurs.\n\`${PREFIX}color nameofColor\`: S'attribuer une couleur.`,
        inline: false,
      },
      {
        name: ":information_source:  Informations",
        value: `1) Pour les pseudos, le BOT récupère que ceux que lui il a détecté depuis son lancement. Les pseudos que vous aviez avant que le bot soit là il ne pourra pas les avoir.\n2) Pour les couleurs vous n'avez plus besoin de retirer vous même l'ancienne pour que la nouvelle s'applique.\n3) Si vous êtes curieux, vous pouvez retorouver le code du bot [ici](https://github.com/Eowalim/Unknown) :wink:.`,
        inline: false,
      }
    )
    .setFooter(`Bot by Eowalim v1.0`);

  message.channel.send(embed);
  message.delete();
};

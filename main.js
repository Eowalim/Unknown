const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX, SERVER, LOGS } = require("./config.js");
const { loadCommands, loadEvents } = require("./util/loader");

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.commands = new Collection();

console.log("Commandes chargées:");
loadCommands(client);
console.log("Events chargés:");
loadEvents(client);

client.login(TOKEN);

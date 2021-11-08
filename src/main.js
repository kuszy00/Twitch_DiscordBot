const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command.handler', 'event.handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.DISCORD_TOKEN);
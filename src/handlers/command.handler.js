const fs = require('fs');

module.exports = (client, Discord) => {  
    const commandFiles = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.command.js'));
    for(const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if(command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;           
        }       
    }
}
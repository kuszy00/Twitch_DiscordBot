const fs = require('fs');
require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
    name: 'help',
    description: "Wyświetla listę dostępnych komend",
    execute(client, message, args, Discord){
        let embed = new Discord.MessageEmbed()
        .setTitle('Lista komend:');

        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.command.js'));
        for(const file of commandFiles) {
            const command = require(__dirname + `/${file}`);
            if(command.usage) {
                embed.addField(prefix + command.name, command.description + "\n " + prefix + command.usage);
            } else {
                embed.addField(prefix + command.name, command.description);
            }          
        }       
        embed.setFooter("Made by: kuszy00#5848");
        message.channel.send({ embeds: [embed] });
    }
}
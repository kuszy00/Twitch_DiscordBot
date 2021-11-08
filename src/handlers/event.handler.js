const fs = require('fs');

module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(__dirname + `/../events/${dirs}`).filter(file => file.endsWith('.event.js'));
        for(const file of event_files) {
            const event = require(__dirname + `/../events/${dirs}/${file}`);       
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
        }
    }
    
    ['client', 'guild'].forEach(e => load_dir(e));
}
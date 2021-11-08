const axios = require('axios');

module.exports = {
    name: 'ttv',
    description: "Pokazuje top 5 streamerów pod względem czasu oglądania danego streamera. Dane pobierane są z xayo.pl",
    usage: "ttv <nazwa z Twitcha>",
    async execute(client, message, args, Discord){
        if(!args[0]) 
			return message.channel.send("Podaj nazwę użytkownika!");

        const url = `https://xayo.pl/api/watchtime/${args[0]}`;
        const data = await axios.get(url).then(({ data }) => data);
        
        let embed = new Discord.MessageEmbed()
        .setTitle(`Top 5 streamerów użytkownika ${args[0]}`);
        for(let i = 0; i < 5; i++){
            const streamer = data[i];
            if(!streamer) continue;
            //console.log(streamer.streamer + " " + parseFloat(streamer.count*5/60).toFixed(2) + " godzin");
            embed.addField(streamer.streamer, parseFloat(streamer.count*5/60).toFixed(2) + " godzin");
        }
        message.channel.send({ embeds: [embed] });
    }
}
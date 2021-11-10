const axios = require('axios');

module.exports = {
    name: 'ttv',
    description: "Pokazuje top 5 streamerów pod względem czasu oglądania danego użytkownika. Dane pobierane są z xayo.pl",
    usage: "ttv <nick z Twitcha>",
    async execute(client, message, args, Discord){
        if(!args[0]) 
			return message.channel.send("Podaj nazwę użytkownika!");

        let embed = new Discord.MessageEmbed()
        user = args[0].toLowerCase();
        const url = `https://xayo.pl/api/watchtime/${user}`;
        const data = await axios.get(url).then(({ data }) => data);

        if(!data[0]){
            embed.setTitle(`Brak użytkownika ${user} w bazie xayo.pl`);
        } else{
            embed.setTitle(`Top 5 oglądanych streamerów użytkownika ${user}\nhttps://xayo.pl/${user}`);
            for(let i = 0; i < 5; i++){
                const streamer = data[i];
                if(!streamer) continue;
                //console.log(streamer.streamer + " " + parseFloat(streamer.count*5/60).toFixed(2) + " godzin");
                embed.addField(streamer.streamer, parseFloat(streamer.count*5/60).toFixed(2) + "h");
            }
        } 
        message.channel.send({ embeds: [embed] });
    }
}
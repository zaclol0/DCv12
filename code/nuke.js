const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
        message.channel.clone().then(channel => channel.send('**Channel Reset.**'));
        message.channel.delete();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["nuke"],
    permLevel: 3
    };
    
    exports.help = {
    name: 'nuke',
    category: 'server',
    description: 'It copies the channel settings and cleans and rebuilds everything.',
    usage: '<prefix>nuke'
    };


const Discord = require('discord.js');

exports.run = (client, message, args) => {

let user;

if (message.mentions.users.first()) {
user = message.mentions.users.first();
} else {
user = message.author;
}

const avatar = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor("A beautiful Avatar. I like it.")
.setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`)
message.channel.send(avatar)

};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["avatar"],
permLevel: 0
};

exports.help = {
name: 'avatar',
category: 'user',
description: 'Assigns the Avatar of the Specified Person or the Person Who Typed the Command.',
usage: '<prefix>avatar <@person-label>'
};
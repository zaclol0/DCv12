const Discord = require('discord.js');
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
const client = new Discord.Client();
const cfg = require('./cfg.json');
var prefix = cfg.prefix;

require("./util/eventLoader")(client);


const log = message => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
  };

client.login(cfg.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./code/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Number of Commands to be Loaded.`);
  files.forEach(f => {
    let props = require(`./code/${f}`);
    log(`Installed Command: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./code/${command}`)];
      let cmd = require(`./code/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./code/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./code/${command}`)];
      let cmd = require(`./code/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

console.log('Bot Completely Ready.')

// -------------------------------------------------------------------------------------

client.on('message', message => {
    if (message.content.toLowerCase() === 'Hi') { 
        message.channel.send('Welcome!')
    }

    if (message.content.toLowerCase() === 'Hi') { 
        message.channel.send('Welcome!')
    }

    if (message.content.toLowerCase() === 'Hi') { 
        message.channel.send('Welcome!')
    }

    if (message.content.toLowerCase() === 'Hi') { 
        message.channel.send('Welcome!')
    }


    
  });


// -------------------------------------------------------------------------------------


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (cfg.author.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


// READY
client.on('ready', () => {
    client.user.setPresence({ activity: { type: "WATCHING",  name: `https://github.com/zaclol0/DCv12`}, status: 'idle' })    
  })

client.login(cfg.token);
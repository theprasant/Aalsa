const express = require('express');
const app = express();
const port = 2000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client({
    //allowedMentions: {
        // set repliedUser value to `false` to turn off the mention by default
      //  repliedUser: false
   // }
});

require("./ExtendedMessage");

client.commands = new Discord.Collection();

const Database = require("@replit/database")
const db = new Database()


const { prefix } = require('./config.json');

const fs = require('fs');

//Getting Commands
const commandFolders = fs.readdirSync('./commands');


for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

//Ready Event
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

client.user.setActivity(`${client.guilds.cache.size} servers and LISTENING to A.help`, {type:"WATCHING"});
});


//Message Event
client.on('message', message => {
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  //if (!client.commands.has(commandName)) return;


  const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }
/*
  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply(`You don't have enough permissions`);
    }
  }
  */

//Checking Permission
  if(message.channel.type !== 'dm' && command.userPerms && !message.member.hasPermission(command.userPerms)){
    
      return message.channel.send(`Sorry, you need \`${command.userPerms.filter(p => !message.member.hasPermission(p)).join("`, `")}\` permission(s) to use this command`)
    .catch(err =>{
    return message.author.send(`Sorry, I couldn't execute and reply your command in \`${message.guild.name}\` as I don't have enough permissions (most probably send message permission)... and sorry for the ping. I sent DM to you not to loose your faith :smiling_face_with_tear: ... `).catch(err => console.error(err))
    })
  }

  if(message.channel.type !== 'dm' && command.myPerms && !message.guild.me.hasPermission(command.myPerms)){
    
    return message.channel.send(`Sorry, I don't have \`${command.myPerms.filter(p => !message.guild.me.hasPermission(p)).join("`, `")}\` permission(s) in this server to execute that command.`)
    .catch(err => {
    return message.author.send(`Sorry, I couldn't execute and reply your command in \`${message.guild.name}\` as I don't have enough permissions (most probably send message permission)... and sorry for the ping. I sent DM to you not to loose your faith :smiling_face_with_tear: ... `).catch(err => console.error(err))
    })
  }

 if(message.channel.type !== 'dm' && command.myChannelPerms){
  let myActualChannelperms = message.channel.permissionsFor(message.guild.me).toArray();
  if(!command.myChannelPerms.every((val) =>  myActualChannelperms.includes(val))){
  
    return message.channel.send(`I need \`${command.myChannelPerms.filter(p => !myActualChannelperms.includes(p)).join('`, `')}\` Permission(s) in this channel to execute that command.`)
    .catch(err => {
    return message.author.send(`Sorry, I couldn't execute and reply your command in \`${message.guild.name}\` as I don't have enough permissions (most probably send message permission)... and sorry for the ping. I sent DM to you not to loose your faith :smiling_face_with_tear: ... `).catch(err => console.error(err))
    })
  }
 }

//Checking args
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

//execute
  try {
    command.execute(message, args, commandName, client, db);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }



});


//guildCreate Event

client.on('guildCreate', guild => {
  try {
    client.user.setActivity(`${client.guilds.cache.size} servers and LISTENING to A.help`, { type: "WATCHING" });

    let newGuildInfo = `\`\`\`\nServer Name: ${guild.name}\nServer id: ${guild.id}\nServer members: ${guild.memberCount}\nServer region: ${guild.region}\nServer created at: ${guild.createdAt}\n\`\`\``;

    client.channels.cache.get("856439456857194536").send({ embed: { color: "#FF0077", title: 'I am added to a new Server !', description: `${guild.name} invited me for dinner !`, fields: [{ name: 'Server Info :', value: newGuildInfo }], footer: { text: `${guild.name}`, icon_url: guild.iconURL() }, timestamp: new Date() } });
  } catch (err) {
    console.log(err);

  }

});

client.on('guildDelete', guild => {
  try {
    client.user.setActivity(`${client.guilds.cache.size} servers and LISTENING to A.help`, { type: "WATCHING" });

    let lostGuildInfo = `\`\`\`\nServer Name: ${guild.name}\nServer id: ${guild.id}\nServer members: ${guild.memberCount}\nServer region: ${guild.region}\nServer created at: ${guild.createdAt}\n\`\`\``;

    client.channels.cache.get("856439659487559710").send({ embed: { color: "#FF0077", title: 'I  lost a Server !', fields: [{ name: 'Server Info :', value: lostGuildInfo }], footer: { text: `${guild.name}`, icon_url: guild.iconURL() }, timestamp: new Date() } });
  } catch (err) {
    console.log(err);

  }

})

client.on("guildMemberAdd", function(member){
   const channel = member.guild.channels.cache.find(ch => ch.id === '861813412778475522');
	if (!channel) return;
  channel.send(`Welcome ${member}... Enjoy your stay... you can ping <@745688196440129915>`)
  channel.send(`Write \`A.c your_message\` to chat with me... and \`A.help\` to get list of commands`)
});

client.login(process.env.DISCORD_TOKEN);

process.on("unhandledRejection", (reason, promise) => {
  if (reason.name === "DiscordAPIError") {
    console.error(
      "DAPI",
      `Message: ${reason.message}, Method: ${reason.method}, Path: ${reason.path}`
    );
  } else {
    console.error(
      "UNHANDLED_REJECTION",
      `Reason: ${reason}, Promise: ${promise}`
    );
  }
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT_ERROR", err);
});

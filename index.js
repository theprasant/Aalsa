const express = require('express');
const app = express();
const port = 2000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();
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

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply(`You don't have enough permissions`);
    }
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

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

client.login(process.env.DISCORD_TOKEN);
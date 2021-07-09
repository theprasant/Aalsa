const Discord = require('discord.js');

module.exports = {
  name: 'invite',
  aliases: ['i'],
  description: 'Invite your beloved Aalsa to your Server for a dinner !',
   args: false,
   myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],


  execute(message, args, client) {

    const inviteEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Invite Aalsa for a dinner')
	//.setURL('https://discord.com/oauth2/authorize?client_id=852560696482463744&scope=bot&permissions=8589934583')
	.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
	.setDescription('You can uncheck some permissions.')
	.setThumbnail(`https://images-ext-2.discordapp.net/external/iQ6U62Z1h-QFPIvYo8r5mec2giMlB2epYC2ho63h-XI/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/852560696482463744/143c431be6afaaba298c4b515ff7975e.png`)
	.addFields(
		{ name: 'Want to invite Aalsa ?', value: '[invite Aalsa](Invite link goes here)' , inline: true},
		{ name: 'Want any help ?', value: '[Join support server](server link)', inline: true },
	)
	.setTimestamp()
	.setFooter(`requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);

message.channel.send(inviteEmbed);

    /*
    let invTitle = `Invite Aalsa for a dinner`
    let invMsg = `[Click here](https://discord.com/oauth2/authorize?client_id=852560696482463744&scope=bot&permissions=8589934583) to invite me to your server...`;
    let invUser = `${message.author.username}`;
    let invIcon = `${message.author.displayAvatarURL()}`;
    message.channel.send({embed:{color:"#FF0077",title:invTitle, description:invMsg, footer:{text:invUser, icon_url:invIcon}, timestamp: new Date() }});
  */
  },
};
const Discord = require('discord.js');
const {niceDate, niceTime} = require('../../functions/nicetimer')
module.exports = {
  name: 'serverinfo',
  aliases: ['si', 'guildinfo', 'server', 'gi', 'guild'],
  description: 'Shows Information of this Server',
   myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],


  args: false,
guildOnly: true,

  execute(message, args, client) {
     
    try{
      if(!message.member) return;

      const guild = message.guild;
      let roles = message.guild.roles.cache.map(r=>r);
      
    let guildEmbed = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setTitle(`${guild.name}`)
	//.setAuthor(`${guild.name}`)
  .setThumbnail(`${guild.iconURL()?guild.iconURL({ format: 'png', dynamic: true }):'https://github.com/prasantkumar123/project-assets/blob/master/discord-white.png?raw=true'}?size=2048`)
	.addFields(
      { name: `» Member(s)[${guild.memberCount}]`, value: `• Human(s): **${guild.members.cache.filter(member => !member.user.bot).size}**\n• Bot(s): **${guild.members.cache.filter(member => member.user.bot).size}**\n• Owner: ${message.guild.member(guild.owner) ? guild.owner.user: ''} - **${guild.owner.user.tag}**`, inline: true },
      { name: '» Channel(s)', value: `• **${guild.channels.cache.filter(c => c.type === 'text').size}** Text - **${guild.channels.cache.filter(c => c.type === 'voice').size}** Voice - **${guild.channels.cache.filter(c => c.type === 'category').size}** Categories\n• System: ${guild.systemChannel?guild.systemChannel:"**None**"}\n• AFK: ${guild.afkChannel?guild.systemChannel:"**None**"}`, inline: true },
      { name: `» Roles[${roles.length}]`, value:`${getRoles(roles, 5)}`},
      { name: `» Others`, value: `• Emoji [**${guild.emojis.cache.size}**]: **${guild.emojis.cache.filter(e => e.animated === false).size}** Static & **${guild.emojis.cache.filter(e => e.animated === true).size}** Animated\n• Verification Level: **${guild.verificationLevel}**\n• Created at **${niceDate(guild.createdAt)}** - **${niceTime(guild.createdAt)}**\n• Region **${guild.region}**\n• Boosts: **${guild.premiumSubscriptionCount}** & Boost level: **${guild.premiumTier}**`  },
	) 
	.setTimestamp()
	.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);



message.channel.send(guildEmbed);

    }catch(err){
      console.error(err);
      message.channel.send(`Couldn't fetch server info`)
    }
    //message.channel.send(`> Server: ${message.guild.name}\n> Total members: ${message.guild.memberCount}\n> Server created at: ${message.guild.createdAt}\n> Location: ${message.guild.region}`);
  },
};

/*
const getIcon = (guild, message) => {
    if(!guild.iconURL()){
      return message.author.displayAvatarURL({ format: 'png', dynamic: true });
    }
    return guild.iconURL({ format: 'png', dynamic: true });
  
}
*/


function getRoles(roles, n){

  if(roles.length <= n) return roles;

  let extra;
  extra = roles.length - n;
  roles.length = n;

  return roles + ` & **${extra}** more`
}

/*
const niceDate = (dt) => {
  return `${dt.toLocaleString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`.replace(/,/ig, ' ').replace(/\s/i, ' -');
}

const niceTime = (dt) => {
  return `${dt.toLocaleString("en-IN")}`.split(',')[1];
}
*/

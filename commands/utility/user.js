const Discord = require('discord.js');

module.exports = {
  name: 'user',
  aliases: ['whois', 'userinfo', 'ui','who'],
  description: 'Show information about a user',
  args: false,
  guildOnly: true,
  myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],
  usage: '<user>',
  execute(message, args, client) {
    let targetUser = message.author;
    let targetMember = message.member;
    if (message.mentions.users.size) {
      targetUser = message.mentions.users.first();
      targetMember = message.mentions.members.first();
    }
    
  // const joinedTime = new Date(message.member.joinedTimestamp);

  let roles = targetMember.roles.cache.map(r => r);

   let color = targetMember.displayHexColor || "RANDOM"
      if (color == "#ffffff" || color == "#000000" || !color ) color = "RANDOM";

    const userEmbed = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor(`${targetUser.tag}`, `${targetUser.displayAvatarURL({ format: 'png', dynamic: true })}`, `${targetUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
	.setDescription(`${targetUser} - [ID : ${targetUser.id} ] - [Avatar](${targetUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048)`)
	.setThumbnail(`${targetUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
	.addFields(
      { name: ' 🎉 Joined', value: `${niceDate(targetMember.joinedAt)} \n ${niceTime(targetMember.joinedAt)}`, inline: true },
      { name: ' 🕯️ Created', value: `${niceDate(targetUser.createdAt)} \n ${niceTime(targetUser.createdAt)}`, inline: true },
      { name: ` 🏷️ Roles(${roles.length})`, value: `${getRoles(roles)}` },
      { name: `🏅 Badges (${targetUser.flags.toArray().length})`, value: `${getBadges(targetUser)}`, inline: true},
      { name: ` 👑 Highest Role`, value: `${targetMember.roles?targetMember.roles.highest:"None"}`, inline: true}
	)
	.setTimestamp()
	.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);



message.channel.send(userEmbed);
  },
};



function getRoles(roles){

  if(roles.length <= 5) return roles;

  let extra;
  extra = roles.length - 5;
  roles.length = 5;

  return roles + ` & **${extra}** more`
}

const niceDate = (dt) => {
  return `${dt.toLocaleString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`.replace(/,/ig, ' ').replace(/\s/i, ' -');
}

const niceTime = (dt) => {
  return `${dt.toLocaleString("en-IN")}`.split(',')[1];
}

const getBadges = (user) => {
  if(!user.flags.bitfield){
    return `User doesn't have any badge`;
  }
  return user.flags.toArray();
}


/*
module.exports = {
  name: 'user',
  aliases: ['whois', 'userinfo', 'ui','who'],
  description: 'Show information about a user',
  args: false,
  guildOnly: true,
  execute(message, args, client) {
    message.channel.send(`> Your username: ${message.author.username}\n> Your ID: ${message.author.id}\n> Your Tag: ${message.author.tag}`);
  },
};

*/
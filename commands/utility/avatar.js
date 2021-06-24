const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: ['a', 'icon', 'pfp', 'pic'],
  description: 'Shows Avatar of your or any other member in this server.',
  args: false,

  execute(message, args, client) {
    try {

      let avatarUser = message.author;
      if (message.mentions.users.size) {
        avatarUser = message.mentions.users.first();
      }


                const avatarEmbed = new Discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setAuthor(`${avatarUser.tag}`, `${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}`, 'https://discord.js.org')
                  .setImage(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
                  .setTimestamp()
                  .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
                
                   message.channel.send(avatarEmbed)
              
          
       



      /*
  
      const avatarEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    //.setTitle('Some title')
    //.setURL('https://discord.js.org/')
    .setAuthor(`${avatarUser.tag}`, `${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}`, 'https://discord.js.org')
    //.setDescription('Some description here')
    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    
    //.addField('Inline field title', 'Some value here', true)
    .setImage(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
  
  
  
  message.channel.send(avatarEmbed);
  */

    } catch (err) {
      console.error(err);
      message.channel.send(`Something went wrong !`)
    }

  },
};
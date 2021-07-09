const { prefix} = require('../../config.json');

module.exports = {
  name: 'feedback',
  aliases: ['fb', 'suggestion', 'suggest'],
  description: 'Have any suggestion ? give a feedback.',
    args: true,
    usage: '<feedback_message>',
      myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],


  execute(message, args, command, client) {
    
    if (args.join('').trim('') === '') {
      return message.channel.send(`${message.author}, what can we do with empty feedback ? Please provide sufficient data for feedback 😁`);
    }
    
    const feedMsg = `> ${message.content.substr(prefix.length).trimStart().substr(command.length).replace(/\n+/g, '\n> ')}`;

    const feedUser = `\`\`\`\nUser name: ${message.author.username}\nUser id: ${message.author.id}\n\`\`\``;


    if (message.channel.type === 'dm') {
      const feedtitle = `${message.author.tag}'s feedback from DM`;
      try {
        client.channels.cache.get("852935787691769856").send({ embed: { color: "#FF0077", title: feedtitle, description: feedMsg, fields: [{ name: 'User Info :', value: feedUser }], footer: { text: message.author.username, icon_url: message.author.displayAvatarURL() }, timestamp: new Date() } });

        message.channel.send(`Thank you ${message.author} for your feedback ❤️`);
        return;

      } catch (err) {
        console.error(err);
        message.channel.send('Some Error occurred !');
        
      }

    }
    
    
    const feedtitle = `${message.author.tag}'s feedback from ${message.guild.name} server`;
    
    const feedGuild = `\`\`\`\nGuild name: ${message.guild.name}\nGuild id: ${message.guild.id}\nChannel name: ${message.channel.name}\nChannel id: ${message.channel.id}\`\`\``;
    
    //console.log(feedMsg);
    try {
     
      client.channels.cache.get("856134487074537512").send({embed : {color:"#FF0077",title: feedtitle, description:feedMsg, fields:[{name:'User Info :', value:feedUser},{name:'Server Info :', value:feedGuild}], footer:{text:message.author.username, icon_url:message.author.displayAvatarURL()}, timestamp: new Date()}});

      /*
      client.channels.cache.get("852935787691769856").send(`**${message.author.username}**'s feedback from **${message.guild.name}**\n\n> ${args.join(' ')}\n\nServer Id: ${message.guild.id}\nChannel Id: ${message.channel.id}\n-------------------\n\n-------------------\n`);
*/
      message.channel.send(`Thank you ${message.author} for your feedback ❤️`);
    } catch (err) {
      console.error(err);
      message.channel.send('Some Error occurred !');
    }
  },
};
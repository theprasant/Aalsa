module.exports = {
    name: 'ban',
    aliases: ['b'],
    description: 'ban a user',
    guildOnly: true,
    usage: '<user>',
	permissions: 'BAN_MEMBERS',
    args: true,
    execute(message, args, client) {
      try{
        const user = message.mentions.users.first();
        message.guild.members.ban(user).catch(err=>msg.reply(err.message));
        message.channel.send(`Banned ${user} succesfully`);
        message.channel.send('<:voldyAttack:853598830632763432>').then(message.react('854700368126541834'))
              }catch(err){
              message.channel.send("something went wrong !")
        console.error(err);
        
      }
    },
  }
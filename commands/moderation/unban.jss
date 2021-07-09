module.exports = {
    name: 'unban',
    aliases: ['ub'],
    description: 'Unban a user',
    guildOnly: true,
    usage: '<user>',
	permissions: 'BAN_MEMBERS',
    args: true,
    execute(message, args, client) {
      try{
        const ubId = args[0];
        message.guild.members.unban(ubID);
        message.channel.send(`unbanned ${user} succesfully !`)
      }catch(err){
        console.error(err);
        message.channel.send("something went wrong !")
      }
    },
  }
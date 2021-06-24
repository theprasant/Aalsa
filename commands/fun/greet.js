module.exports = {
  name: 'greet',
  aliases: ['hello', 'hi'],
  description: 'Greet your beloved one.',
    args: false,
    usage: '<user>',
      guildOnly: true,


  execute(message, args) {
    if(!message.mentions.users.size){
      return message.channel.send(`You didnt specify whom to greet !`);
    }
    const taggedUser = message.mentions.users.first();
    // console.log(taggedUser);
    if (taggedUser === undefined) {
      return message.channel.send(`Hey there ${args[0]}`);
    }
    message.channel.send(`Hey there ${taggedUser.username} !`);
  },
};
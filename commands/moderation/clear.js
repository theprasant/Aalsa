module.exports = {
  name: 'clear',
  aliases: ['deletemult', 'clearmult'],
  description: 'Delete multiple messages',
  args: true,
  usage: '<number>',
  userPerms: ['MANAGE_MESSAGES'],
  myChannelPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES'],
  guildOnly: true,

  execute(message, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    } else if (amount < 2 || amount > 100) {
      return message.reply('you need to input a number between 2 and 100.');
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('there was an error trying to prune messages in this channel!');
    });

    message.channel.send(`Deleted ${amount - 1} messages. requested by ${message.author.username}... Enjoy !`)
      .then(msg => {
        setTimeout(() => msg.delete(), 1500)
      })
      .catch(err => message.channel.send(err));
  }
};
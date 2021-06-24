module.exports = {
  name: 'switch',
  description: 'switch the ball',
    args: true,
    usage: '<number>',

  execute(message, args) {
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    } else if (amount < 1 || amount > 50) {
      return message.reply('you need to input a number between 1 and 50.');
    }
 
    message.channel.send(`<a:switch:855435104011550750>`.repeat(amount));

  },
};
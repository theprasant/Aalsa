module.exports = {
  name: 'support',
  aliases: ['supportserver', 'helpserver'],
  description: 'Want to join support server of Aalsa ? here it\'s..',
    args: false,

  execute(message, args) {
    message.channel.send('https://discord.gg/gQtQ9M9baw');
  },
};
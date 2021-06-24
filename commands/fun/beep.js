module.exports = {
  name: 'beep',
  description: 'Beep!',
    args: false,

  execute(message, args) {
    message.channel.send('Boop.');
  },
};
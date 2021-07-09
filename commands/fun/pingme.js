module.exports = {
  name: 'pingme',
  aliases: ['pm'],
  description: 'Ask Aalsa to ping you',
  myChannelPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES'],

  args: false,

  execute(message, args) {
    message.channel.send(`pinged you ${message.author.toString()} haha \\😉`);
  },
};
module.exports = {
  name: 'ping',
  description: 'Ping!',
  myChannelPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES'],

  args: false,

  execute(message, args) {
    // message.channel.send(`pong ${message.author.tag} !`);
    message.channel.send(`<a:cute_dance:855647507072679946> Hey ${message.author.username} ! Pong :ping_pong: `)
      .then(message.react(`855642342332432414`));

  },
};

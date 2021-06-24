
const mySecret = process.env['DISCORD_TOKEN']
module.exports = {
  name: 'user',
  aliases: ['whois', 'userinfo', 'ui','who'],
  description: 'Show information about a user',
    args: false,

  execute(message, args) {
    message.channel.send(`> Your username: ${message.author.username}\n> Your ID: ${message.author.id}\n> Your Tag: ${message.author.tag}`);
  },
};
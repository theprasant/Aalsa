const { prefix } = require('../../config.json');

module.exports = {
  name: 'devannounce',
  aliases: ['da'],
  description: 'Developer announcement [0] guild, [1] channel',
    args: true,
    usage: '<channel_id> <message>',

  execute(message, args, command, client) {
    if (message.author.id !== process.env.devId) {
     return message.channel.send(`This is Developer command !`);
    }
 //   let gId = args.shift();
    let cId = args.shift();
    let anMsg = message.content.substr(prefix.length).trimStart().substr(command.length).trimStart().substr(cId.length);

    try {
      client.channels.cache.get(cId).send(anMsg);

      message.channel.send(`announced successfully in ${client.channels.cache.get(cId).name} !`);

    } catch (err) {
      console.error(err);
      message.channel.send(`${err}`)
    }
  },
};
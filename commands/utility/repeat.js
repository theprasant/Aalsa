const { prefix } = require('../../config.json');

module.exports = {
  name: 'repeat',
  aliases: ['say'],
  description: 'Repeat your command anonymously.',
    args: true,
    myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],

    usage: '<message>',

  execute(message, args, command, client) {
    try {
     const repeatMsg = message.content.substr(prefix.length).trimStart().substr(command.length);
//console.log(command);
      message.channel.send(repeatMsg, {disableMentions: true});
      /*
      setTimeout(() => {
        console.log('dlt msg');
        message.delete();
        console.log(message);
      }, 1000);
*/
    } catch (err) {
      message.channel.send(`${err}`);
      console.error(err);
    }
  },
};
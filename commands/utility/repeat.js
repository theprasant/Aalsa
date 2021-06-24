const { prefix } = require('../../config.json');

module.exports = {
  name: 'repeat',
  aliases: ['say'],
  description: 'Repeat your command anonymously.',
    args: true,
    usage: '<message>',

  execute(message, args, command, client) {
    try {
     const repeatMsg = message.content.substr(prefix.length).trimStart().substr(command.length);
//console.log(command);
      message.channel.send(repeatMsg);
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
const fetch = require('../../node_modules/node-fetch');
module.exports = {
  name: 'chat',
  aliases: ['c', 'ch'],
  description: 'Chat with another bot',
    args: true,
    usage: '<message>',

  execute(message, args) {
    let url = `https://api.udit.gq/api/chatbot?message=${args.join(' ')}&name=Aalsa&user=${message.author.id}&gender=female`;
   // console.log(message.author.id);
    try {
      
        fetch(url)
          .then(response => response.json())
          .then(data => message.channel.send(`${data.message}`));

    } catch (err) {
      console.error(err);
      message.channel.send(`${err}`);
    }
  },
};

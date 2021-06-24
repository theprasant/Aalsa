const { prefix } = require('../../config.json');

module.exports = {
  name: 'eval',
  aliases: ['e', 'ev'],
  description: 'eval, this is developer command',
    args: true,
    usage: '<code>',

  async execute(message, args, command, client, db) {
    if (message.author.id !== process.env.devId) {
      return message.channel.send('This command is only for developer.');
    }

       let code = message.content.substr(prefix.length).trimStart().substr(command.length);


    if (typeof code == 'undefined') {
      return message.channel.send('Dont send string');
    }
    if (code === '') {
     return message.channel.send('Please write something to evaluate.');
    }

    try {

      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      let msgLimit = 1500;

      if (evaled.length > msgLimit) {
        let arrNo = (evaled.length - (evaled.length % msgLimit)) / msgLimit;
       message.channel.send(`${evaled.length} : ${arrNo + Number(arrNo * msgLimit !== evaled.length)}`);

        
        message.channel.send(clean(evaled), { split: { maxLength: 1500}, code: "javascript" })

      }
            await message.channel.send(clean(evaled), { code: "javascript" });

    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

  },
};

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}
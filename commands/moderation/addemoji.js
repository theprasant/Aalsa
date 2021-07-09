module.exports = {
  name: 'addemoji',
  aliases: ['ae', 'emoadd', 'emocreate'],
  description: 'adds an emoji to server.',
  guildOnly: true,
  args: true,
  usage: '<emoji_name> <emoji_link>',
  myPerms: ['MANAGE_EMOJIS'],
  userPerms: ['MANAGE_EMOJIS'],
  myChannelPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
  execute(message, args, command, client) {
    try {
      
      if(args.length != 2) return message.channel.send(`You need to provide two arguments. 
  > First one is the name of the emoji
  > Second one is the link of the image to be added in emoji... 
  **\`Emoji size should be less than 256 kb\`**`)

      message.guild.emojis.create(args[1], args[0]).then(e => message.channel.send(`Added emoji <${e.animated ? 'a' : ''}:${e.name}:${e.id}> with name \`${e.name}\` by ${message.author.tag}`)).catch(e => console.error(e))

    } catch (err) {
      console.error(err);
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err.message)}\n\`\`\``)
    }
  },
};

const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}
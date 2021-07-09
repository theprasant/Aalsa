
//require("../../ExtendedMessage");

module.exports = {
  name: 'emoji',
  aliases: ['emo', 'emote', 'emot'],
  description: 'Chat with another bot',
  args: true,
  guildOnly: true,
 usage: '<emoji_name>',
   myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],

 execute(message, args, command , client) {
    
    try {

      let emo = client.emojis.cache.find(emoji => emoji.name === args[0]);

      if(!emo){
        return message.inlineReply("Couldn't find that emoji in any of my servers")
      }
      
         message.channel.send(emo.toString());

    } catch (err) {
      console.error(err);
      message.channel.send(`${err}`);
    }
  },
};

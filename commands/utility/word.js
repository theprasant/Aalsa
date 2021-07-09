const Owlbot = require('owlbot-js');
const Discord = require('discord.js');
 
const owl = Owlbot('c720eaba16b08bdca2a3c8411d1e513737cf2ef9');

module.exports = {
    name: 'word',
    description: 'Search for definition of a word',
    myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],
    aliases: ['def', 'define', 'whatis','pronounce'],

    //cooldown: 35,
    args: true,
    execute(message, args,command, client) {
      try{
      let loadEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`<a:gsearch:858323508705624084> Looking for the word in my dictionary..`)
      let loadMsg = message.channel.send(loadEmbed).then(msg =>{

      
      //.setDescription(`Pronunciation: ${result.pronunciation}`)
        owl.define(encodeURIComponent(args.join(' ').toLowerCase())).then(function(result){
          console.log(result)
          return;

            const owlEmbed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle(`${result.word}`)
  
  if(result.pronunciation!=null && result.pronunciation.toString().trim()!=''){
    owlEmbed.setDescription(`Pronunciation: ${result.pronunciation}`)
  }
  if(result.definitions.length){
      result.definitions.forEach((e,i) => {
        owlEmbed.addField(`» \`Definition ${i+1}\``, `• **Type:** ${e.type}\n• **Definition:** ${e.definition}\n${e.example!=null && e.example.toString().trim()!=''?'• **Example:** ' +e.example:'Not avilable'}\n${e.emoji?'• **Emoji:** '+e.emoji:''}`)
        if(e.image_url!=null) owlEmbed.setThumbnail(e.image_url.toString());
      });
  }
msg.edit(owlEmbed)
 
         }).catch(e => {
            msg.edit('Word not found !');
           console.error(e)
          });

        })
        }catch(err){
          console.error(err)
        }
    },
  };
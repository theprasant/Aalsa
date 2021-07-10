const Discord = require('discord.js');
const { prefix, token, devId } = require('../../config.json');
const { createCanvas, loadImage } = require('canvas')

module.exports = {
  name: 'makeme',
    aliases: ['mm'],

  description: 'Create an exciting image with your avatar',
  args: false,
  usage: '<banner_name>',

  async execute(message, args, command, client) {
    try {

      const width = 600;
    const height = 600;

      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      const imgLeft = 170;
      const imgTop = 30;
      const imgHeight = 150;
      const imgWidth = 150;
      
        let avatarUser = message.author;
      if (message.mentions.users.size) {
        avatarUser = message.mentions.users.first();
      }

      //let userAvatar = new Image(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`);

      message.channel.send({ embed: { color: "#FF0077", title: `<a:loading2:855443386580074508> Loading <a:switch:855435104011550750> `, description: `This process may take some time... Please wait.`, footer: { text: `${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}` }, timestamp: new Date() } })
      .then(async msg =>{
      let firstEmbed = msg.embeds[0] ;
       try {
        const editEmbed1 = new Discord.MessageEmbed(firstEmbed).setDescription('Loading Images <a:typing:858377053945987123>');
        msg.edit(editEmbed1)
        .catch(e => {
          message.channel.send("Oops ! Connection problem. Please try again.")
          console.error(e)
          msg.delete()
          return
        })
       } catch (error) {
         console.log("couldn't edit 1")
       }

        const userAvatar = await loadImage(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
        loadImage(`./assets/images/hulk.png`).then(async image => {
         
         

          context.strokeStyle = '#74037b';
          context.drawImage(image, 0, 0, width, height)
            try {
              const editEmbed2 = new Discord.MessageEmbed(firstEmbed).setDescription('Drawing Canvas <a:typing:858377053945987123>');
              msg.edit(editEmbed2)
              .catch(e => {
                message.channel.send("Oops ! Connection problem. Please try again.")
                console.error(e)
                msg.delete()
                return
              })
             } catch (error) {
               console.log("could't edit 2")
             }
        

         // Pick up the pen
	          
           
           context.beginPath();
           // Start the arc to form a circle
          context.arc(imgLeft + imgWidth/2, imgTop + imgHeight/2, imgWidth/2 ,0, Math.PI * 2, true);
	          // Put the pen down
	          context.closePath();
	          // Clip off the region you drew on
	          context.clip();

            context.drawImage(userAvatar, imgLeft, imgTop,imgHeight, imgWidth)
              try {
                const editEmbed3 = new Discord.MessageEmbed(firstEmbed).setDescription('Preparing Embed <a:typing:858377053945987123>');
          msg.edit(editEmbed3)
          .catch(e => {
            message.channel.send("Oops ! Connection problem. Please try again.")
            console.error(e)
            msg.delete()
            return
          })
              } catch (error) {
                console.log("could't edit 3")
              }
  

           

  const buffer = canvas.toBuffer('image/png')
  const file = new Discord.MessageAttachment(buffer, 'makemehulk.png');
  
  const avatarEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Hey there junior Hulk ${avatarUser.username} !`)
                .setAuthor(`${avatarUser.tag}`, `${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}`, 'https://discord.js.org')
                .attachFiles(file)
                .setImage('attachment://makemehulk.png')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
          return avatarEmbed;
         
        }).then((avatarEmbed) => {
         
          try {
            const editEmbed4 = new Discord.MessageEmbed(firstEmbed).setDescription('Almost Done <a:greentick:858329914716323850>');
        msg.edit(editEmbed4)
        .catch(e => {
          message.channel.send("Oops ! Connection problem. Please try again.")
          console.error(e)
          msg.delete()
          return
        })
          } catch (error) {
            console.log("couldn't edit 4")
          }

          message.channel.send(avatarEmbed)
          .then(()=>{
            msg.delete()
          })
          
           .catch(error => console.error('Failed to update message ', error));
       
            
        })
  



        
      })





    } catch (err) {
      message.channel.send(`${err}`);
      console.error(err);
    }
  },
};
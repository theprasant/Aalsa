const Discord = require('discord.js');

const ColorThief = require('color-thief');
let colorThief = new ColorThief();
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas')



module.exports = {
  name: 'avatarcolor',
  aliases: ['ac', 'pfpcolor', 'pc', 'piccolor'],
  description: 'Displays the dominant color of user\'s avatar',
  args: false,

  execute(message, args, client) {

    

    try {

      const width = 1200;
     const height = 1200;

    const colorWidth = 630;
    const colorHeight = 64;

      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      const colorCanvas = createCanvas(colorWidth, colorHeight)
      const colorContext = colorCanvas.getContext('2d')


      let avatarUser = message.author;
      if (message.mentions.users.size) {
        avatarUser = message.mentions.users.first();
      }


 message.channel.send({ embed: { color: "#FF0077", title: `<a:loading2:855443386580074508> Loading <a:switch:855435104011550750> `, description: `Fetching color and loading data... Please wait.`, footer: { text: `${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}` }, timestamp: new Date() } })
 .then((sentMsg) => {

 
      loadImage(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}`).then(image => {
        context.drawImage(image, 0, 0, width, height)

        // fs.writeFileSync('./avatar.png', buffer)
      }).then(() => {
        const buffer = canvas.toBuffer('image/png')
        getDominantColor(buffer)
          .then(c => {
            colorContext.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`
            colorContext.fillRect(0, 0, colorWidth, colorHeight)
            const colorBuffer = colorCanvas.toBuffer('image/png')
            const file = new Discord.MessageAttachment(colorBuffer, 'avatarcolor.png');


            const avatarEmbed = new Discord.MessageEmbed()
              .setColor(c)
              .setTitle(`Dominant color of ${avatarUser.username}'s Avatar`)
              .setAuthor(`${avatarUser.tag}`, `${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}`, 'https://discord.js.org')
              .setThumbnail(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
              .addFields(
                { name: 'User avatar', value: `[click here](${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048) to get avatar url` },
                { name: 'rgb value', value: `rgb(${c[0]}, ${c[1]}, ${c[2]})`, inline: true },
                { name: 'Hex value', value: `${getHex(c)}`, inline: true },
              )
              .attachFiles(file)
              .setImage('attachment://avatarcolor.png')
              .setTimestamp()
              .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);


            /*
            const avatarEmbed = {
              color: 0x0099ff,
              title: 'Some title',
              url: 'https://discord.js.org',
              author: {
                name: 'Some name',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
                url: 'https://discord.js.org',
              },
              description: 'Some description here',
              thumbnail: {
                url: 'https://i.imgur.com/wSTFkRM.png',
              },
              fields: [
                {
                  name: 'Regular field title',
                  value: 'Some value here',
                },
                {
                  name: '\u200b',
                  value: '\u200b',
                  inline: false,
                },
                {
                  name: 'Inline field title',
                  value: 'Some value here',
                  inline: true,
                },
                {
                  name: 'Inline field title',
                  value: 'Some value here',
                  inline: true,
                },
                {
                  name: 'Inline field title',
                  value: 'Some value here',
                  inline: true,
                },
              ],
              image: {
                url: 'attachment://avatarcolor.png',
              },
              timestamp: new Date(),
              footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
              },
            };
            */

            const exampleEmbed = {
              title: 'Some title',
              image: {
                url: 'attachment://discordjs.png',
              },
            };

            //message.channel.send({ files: [file], embed: exampleEmbed })

            //    message.channel.send({ files: [file], embed: avatarEmbed })
            sentMsg.delete()
            message.channel.send(avatarEmbed)


              .catch(error => console.error('Failed to remove reactions: ', error));
          })
      })
      })




      /*
   
      const avatarEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    //.setTitle('Some title')
    //.setURL('https://discord.js.org/')
    .setAuthor(`${avatarUser.tag}`, `${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}`, 'https://discord.js.org')
    //.setDescription('Some description here')
    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    
    //.addField('Inline field title', 'Some value here', true)
    .setImage(`${avatarUser.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
   
   
   
  message.channel.send(avatarEmbed);
  */

    } catch (err) {
      console.error(err);
      message.channel.send(`Something went wrong !`)
    }

  },
};

async function getDominantColor(img) {

  const dominantColor = await colorThief.getColor(img);
  return dominantColor;
}

function getHex(rgb) {
  let r = rgb[0].toString(16);
  let g = rgb[1].toString(16);
  let b = rgb[2].toString(16);
  //let a = Math.round(a * 255).toString(16);

  if (r.length == 1) {
    r = "0" + r;
  }
  if (g.length == 1) {
    g = "0" + g;
  }
  if (b.length == 1) {
    b = "0" + b;
  }
  /*
if (a.length == 1){
  a = "0" + a;
  }
  */

  return "#" + r + g + b;
}
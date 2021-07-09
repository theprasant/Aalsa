module.exports = {
  name: 'verify',
  description: 'Verify yourself.',
  args: false,
  myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],

  execute(message, args, command, client, db) {

   // message.channel.send(`${getDbV(db)}`)

    //db.get("verified", { raw: false }).then( v => v)

    /*
    let verifiedUsers; 
    db.get("verified")
     .then(v => verifiedUsers = v) //.then(u => u);
     console.log(verifiedUsers)
     return;
     verifiedUsers.push(message.author.id);
     db.set('verified', verifiedUsers)
     .then( () => {
   message.channel.send(`<a:verified:855420725347483728> Congratulations ${message.author}. You are now a verified user of ${process.env.botname}`).then(message.react('855420725347483728'));

     })
     */
//db.set('verified', "value").then(() => {});
   message.channel.send(`<a:verified:855420725347483728> Congratulations ${message.author}. You are now a verified user of ${process.env.botname}`).then(message.react('855420725347483728'));

  },
};

const getDbV = db => {
  db.get("verified", { raw: false }).then(message.channel.send)
}
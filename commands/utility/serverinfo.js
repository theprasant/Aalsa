module.exports = {
	name: 'serverinfo',
	aliases: ['si', 'guildinfo', 'server', 'gi', 'guild'],
	description: 'Shows Information of this Server',
	  args: false,
	    guildOnly: true,


	execute(message, args) {
		message.channel.send(`> Server: ${message.guild.name}\n> Total members: ${message.guild.memberCount}\n> Server created at: ${message.guild.createdAt}\n> Location: ${message.guild.region}`);
	},
};
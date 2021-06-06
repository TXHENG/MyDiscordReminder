const Discord = require('discord.js')

const my_discord = require('./custom_discord')

module.exports.drink_water = () => {
	const embed = new Discord.MessageEmbed()
		.setColor('#26e9ff')
		.setTitle('Drink Water Reminder')
		.setDescription('Is time to drink water🥛! Take a rest and walk around!')
		.setTimestamp();
	my_discord.send("life", "reminder", "text", {embed: embed, content: '@everyone'})
}
const Discord = require('discord.js')
const client = new Discord.Client()
if (process.env.NODE_ENV) {
	require("dotenv").config({
	  path: `${__dirname}/.env.${process.env.NODE_ENV}`,
	})
  } else {
	require("dotenv").config()
  }
client.login(process.env.DISCORD_TOKEN)
const channels = [
	{
	  name: "BB",
	  id: "850528184267964429",
	  channels: [
		{ name: "reminder", id: "850528289100922881", type: "text" },
		{ name: "parade-info", id: "850528319623659570", type: "text" },
	  ],
	},
	{
	  name: "life",
	  id: "850528931589259276",
	  channels: [{ name: "reminder", id: "850529009699389450", type: "text" }],
	},
	{
	  name: "taruc",
	  id: "850528883832782918",
	  channels: [{ name: "reminder", id: "850529048769593374", type: "text" }],
	},
	{
	  name: "general",
	  id: "850529103923642378",
	  channels: [{ name: "reminder", id: "850529132093243432", type: "text" }],
	},
	{
	  name: "debug",
	  id: "850529954260189245",
	  channels: [
		{ name: "testing-area", id: "850529984401113138", type: "text" },
		{ name: "testing-area", id: "850568608970571797", type: "voice" },
	  ],
	},
]

module.exports.discord_log = (content) => {
	this.getChannel("debug", "testing-area", "text").then(c => {
		c.send(content)
	})
}

module.exports.load_channels_var = () => {
  const guild = client.guilds.cache.find(
    (guild) => guild.id === process.env.DISCORD_GUILD
  )
  const channels = guild.channels.cache.filter((c) => !c.deleted)
  let output = []

  channels.forEach((channel) => {
    if (channel.parentID) {
      if (!output[channel.parent.name]) {
        output.push({
          name: channel.parent.name,
          id: channel.parentID,
          channels: [],
        })
      }
      output
        .find((c) => c.name === channel.parent.name)
        .channels.push({
          name: channel.name,
          id: channel.id,
          type: channel.type,
        })
    }
  })
  console.log(JSON.stringify(output))
}

module.exports.getChannel = async (category, channel, type) => {
	return await client.channels.fetch(channels.find(c => c.name.toLowerCase() === category.toLowerCase()).channels.find(c => c.name.toLowerCase() === channel.toLowerCase() && c.type.toLowerCase() === type.toLowerCase()).id)
}

module.exports.send = (category, channel, type, message) => {
	this.getChannel(category, channel, type).then(c => {
		if(c)
			c.send(message)
		else
			console.error('cannot find channel');
	})
}
const http = require("http")
const express = require("express")
const Discord = require("discord.js")
const client = new Discord.Client()
const cron = require("node-cron")
const tasks = require("./tasks")
const port = process.env.PORT || 3000
const app = express()

if (process.env.NODE_ENV) {
  require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
  })
} else {
  require("dotenv").config()
}

app.listen(port, () => {
  console.log(`App running on ${port}`)
})
app.use("*", require("./route"))

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// client.on("message", (msg) => {
//   if (msg.author.bot) return
//   // console.log(msg)
// })

// Drink water reminder
cron.schedule('*/30 9-23 * * *', tasks.drink_water, {
	scheduled: true,
	timezone: 'Asia/Kuala_Lumpur'
})

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => {
    
  })
  .catch((err) => {
    console.error("Client login fail: " + err)
  })

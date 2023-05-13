/**
 * Author: Adam Seidman
 * 
 * Main entry point for quote bot.
 * 
 */

const { botToken } = require('./config')
const Discord = require('discord.js')

// Bot Intentions
const myIntents = ['GuildMessages', 'MessageContent', 'GuildScheduledEvents']

const bot = new Discord.Client({ intents:myIntents })
bot.login(botToken)

bot.on('ready', () => {
    console.log('Quote Bot Initialized')
})

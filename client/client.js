/**
 * Author: Adam Seidman
 * 
 * Main entry point for quote bot.
 * 
 */

const { botToken } = require('./config')
const Discord = require('discord.js')

const db = require('../base/db')

// Bot Intentions
const myIntents = ['Guilds', 'GuildMessages', 'MessageContent', 'GuildScheduledEvents']

const bot = new Discord.Client({ intents:myIntents })
bot.login(botToken)

bot.on('ready', () => {
    db.setup()
    console.log('Quote Bot Initialized')
})

bot.on('messageCreate', msg => {
    if (msg.member !== null && !msg.author.bot) {
        db.addMessage(msg.content, msg.channel.id)
    }
})
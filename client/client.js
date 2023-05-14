/**
 * Author: Adam Seidman
 * 
 * Main entry point for quote bot.
 * 
 */

const { botToken } = require('./config')
const Discord = require('discord.js')
const recall = require('../base/recall')
const db = require('../base/db')

// Bot Intentions
const myIntents = ['Guilds', 'GuildMessages', 'MessageContent', 'GuildScheduledEvents']

const bot = new Discord.Client({ intents:myIntents })
bot.login(botToken)

bot.on('ready', () => {
    db.setup()
    recall.registerClient(bot)
    console.log('Quote Bot Initialized')
})

bot.on('messageCreate', msg => {
    if (msg.content.toLowerCase().trim() === '!recall') {
        let quote = db.getQuote(msg.guild.id)
        if (quote === undefined) {
            msg.channel.send('There are no quotes to recall.')
        } else {
            recall.sendQuote(quote, true, msg.channel)
        }
    } else if (msg.member !== null && !msg.author.bot) {
        db.addMessage(msg.content, msg.channel.id, msg.guild.id, msg.member.id)
    }
})
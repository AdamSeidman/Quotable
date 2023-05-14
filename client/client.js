/**
 * Author: Adam Seidman
 * 
 * Main entry point for quote bot.
 * 
 */

const { botToken, botId } = require('./config')
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

var relay = function (msg, origUser, failMsg, specificMsgId) {
    if (specificMsgId !== undefined) {
        let quote = db.getSpecificQuote(specificMsgId)
        if (quote === undefined) {
            msg.channel.send('I don\'t have that quote in my database.')
        } else if (quote.guildId !== msg.guild.id) {
            msg.channel.send('That message was not created in this server.')
        } else {
            recall.sendQuote(quote, origUser, msg.channel)
        }
    } else {
        let quote = db.getQuote(msg.guild.id)
        if (quote === undefined) {
            msg.channel.send(failMsg)
        } else {
            recall.sendQuote(quote, origUser, msg.channel)
        }
    }
}

var commands = {
    '!recall': (msg, args) => relay(msg, true, 'There are no quotes to recall.', args[0]),
    '!requote': (msg, args) => relay(msg, false, 'There\'s nothing to requote.', args[0])
}

bot.on('messageCreate', msg => {
    let args = msg.content.toLowerCase().trim().split(' ')
    let cmd = args.shift()
    if (Object.keys(commands).includes(cmd)) {
        commands[cmd](msg, args.length === 0? [undefined] : args)
    } else if (msg.member !== null && msg.member.id !== botId) {
        db.addMessage(msg.content, msg.channel.id, msg.guild.id, msg.member.id, msg.id, msg.author.bot)
    }
})
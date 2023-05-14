/**
 * Author: Adam Seidman
 * 
 * Recall functionality for tracked quotes.
 * 
 * Exports - 
 *     registerClient
 *         - Store client information
 *     sendQuote
 *         - Send supplied quote to tracked channel
 */

const Discord = require('discord.js')

const LOCALE = 'en-US'

var client = undefined

var registerClient = function (bot) {
    client = bot
}

var getUserById = async function (id) {
    if (client === undefined || id === undefined) {
        return client
    }
    return (await client.users.fetch(id))
}

var getChannelById = function (id) {
    if (client === undefined || id === undefined) {
        return undefined
    }
    return client.channels.cache.find(x => x instanceof Discord.TextChannel && x.id == id)
}

var sendQuoteViaWebhook = async function (quoteText, channel, userId) {
    let user = await getUserById(userId)

    let webhook = await channel.createWebhook({
        name: 'Instant-Quote',
        avatar: user.displayAvatarURL()
    }).catch(console.error)

    await webhook.send({
        content: quoteText,
        username: user.username
    }).catch(console.error)

    webhook.delete().catch(console.error)
}

var sendQuote = async function (quote, useOriginalUser, channel) {
    if (client === undefined || quote === undefined) return
    if (!channel) {
        channel = getChannelById(quote.channelId)
    }
    if (useOriginalUser) {
        sendQuoteViaWebhook(quote.text, channel, quote.userId)
    } else {
        let user = await getUserById(quote.userId)
        channel.send(`"${quote.text}" - ${user.username} (${new Date(quote.timestamp).toLocaleString(LOCALE)})`)
    }
}

module.exports = {
    registerClient,
    sendQuote
}
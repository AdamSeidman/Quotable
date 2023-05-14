/**
 * Author: Adam Seidman
 * 
 * Control quotes database.
 * 
 * Exports:
 *     setup-
 *         Gets all quotes from messages database.
 *     addMessage-
 *         Given channelId and text, adds quote to db.
 *     recall-
 *         Runs a provided callback on random quote.
 */

// TODO filter recall by guildId

const sqlite3 = require('sqlite3').verbose()
const { randomArrayItem } = require('./utils')

var messages = []

var getDatabase = function () {
    let result = {}
    result.database = new sqlite3.Database(`${__dirname}\\messages.db`, err => {
        if (err) {
            console.error(`Error getting database:\n\r${err}`)
            return null
        }
    })
    result.close = function () {
        result.database.close(err => {
            if (err) console.error(err)
        })
    }
    result.forEach = function (table, callback) {
        result.database.each(`SELECT * FROM ${table}`, (err, row) => {
            if (err) {
                console.error(`Error in reading sql (Table: ${table}) with foreach:\nRow-`)
                console.error(`${row}\n\r${err}`)
            } else {
                callback(row)
            }
        })
    }
    result.insert = function (table, map, callback) {
        if (typeof(map) !== 'object' || Object.keys(map).length == 0) {
            console.error('Supplied map is invalid.')
        } else {
            let keys = ''
            let values = []
            let valueString = ''
            Object.keys(map).forEach(item => {
                keys += `, ${item}`
                valueString += ', ?'
                values.push(map[item])
            })
            const sql = `INSERT INTO ${table} (${keys.slice(2)}) VALUES (${valueString.slice(2)})`
            result.database.run(sql, values, err => {
                if (err) {
                    console.error(`SQL Insert Error.\n\r${err}`)
                } else {
                    callback()
                }
            })
        }
    }
    return result
}

var setup = function () {
    if (messages.length !== 0) return
    let quotes = getDatabase('messages')
    quotes.forEach('Quotes', row => {
        messages.push(row)
    })
    quotes.close()
}

var addMessage = function (text, channelId) {
    let quotes = getDatabase('messages')
    let quote = {
        text: text,
        channelId: channelId,
        timestamp: Date.now(),
        isExpired: 0
    }
    quotes.insert('Quotes', quote, () => {
        messages.push(quote)
    })
    quotes.close()
}

var recall = function (callback) {
    if (callback !== undefined) {
        callback(randomArrayItem(messages))
    }
}

module.exports = {
    addMessage,
    setup,
    recall
}
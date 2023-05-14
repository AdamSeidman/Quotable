/**
 * Author: Adam Seidman
 * 
 * Useful utilities.
 * 
 * Exports:
 *     copyObject-
 *         Copy js obhect in memory to new object.
 *     randomArrayItem-
 *         Given an array as input, it will chose a random item as output. 
 */

var copyObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
}

var randomArrayItem = function (arr) {
    if (arr === undefined || arr.length <= 1) {
        return undefined
    }
    return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
    copyObject,
    randomArrayItem
}
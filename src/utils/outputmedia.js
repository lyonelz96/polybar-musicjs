require('dotenv').config()

const { scrollText, getScrollTimeout } = require('./scrollingtext')
const MAX_CHAR = process.env.MAX_CHAR

const outputMedia = media => {
    clearTimeout(getScrollTimeout())

    if (media.length > MAX_CHAR) scrollText(media)
    else console.log(media)
}

module.exports = { outputMedia }

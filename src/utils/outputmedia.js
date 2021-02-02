
const { scrollText, getScrollTimeout } = require('./scrollingtext')
const { MAX_CHAR } = require('./maxchar')

const outputMedia = media => {
    clearTimeout(getScrollTimeout())

    if (media.length > MAX_CHAR) scrollText(media)
    else console.log(media)
}

module.exports = { outputMedia }

const {MAX_CHAR} = require('./maxchar')

let scrollTimeout = undefined

const scrollText = text => {
    let beginning = 0
    let end = MAX_CHAR - 1

    const scrollHandler = () => {
        console.log(text.substring(beginning, end))
        beginning++
        end++

        if (end >= text.length - MAX_CHAR) {
            text = text.concat(` | ${text}`)
        }

        scrollTimeout = setTimeout(scrollHandler, 500)
    }

    scrollHandler()
}

const getScrollTimeout = () => scrollTimeout

module.exports = { scrollText, getScrollTimeout }

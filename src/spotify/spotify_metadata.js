const { PLAYER, getProperties } = require('./dbus')

const getArtist = metadata => metadata.value['xesam:artist'].value
const getSong = metadata => metadata.value['xesam:title'].value

const listenForChange = properties => {
    properties.on('PropertiesChanged', (iface, changed, invalidated) => {
        const artist = getArtist(changed['Metadata'])
        const song = getSong(changed['Metadata'])
        const media = `${artist} - ${song}`

        if (media.length > MAX_CHAR) {
            clearTimeout(scrollTimeout)
            scrollText(media)
        }
        else {
            console.log(media)
        }
    })
}

let scrollTimeout = undefined
const MAX_CHAR = 40

const scrollText = (text) => {
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

getProperties()
    .then(properties => {
        properties.Get(PLAYER, 'Metadata')
            .then(metadata => {
                const artist = getArtist(metadata)
                const song = getSong(metadata)
                const media = `${artist} - ${song}`

                if (media.length > MAX_CHAR) {
                    clearTimeout(scrollTimeout)
                    scrollText(media)
                }
                else {
                    console.log(media)
                }
            })

        listenForChange(properties)
    })

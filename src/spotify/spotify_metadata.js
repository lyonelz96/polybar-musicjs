const { getProperties, getMetadata } = require('./dbus')

let scrollTimeout = undefined
const MAX_CHAR = 40

const getArtist = metadata => metadata.value['xesam:artist'].value
const getSong = metadata => metadata.value['xesam:title'].value
const getMedia = metadata => `${getArtist(metadata)} - ${getSong(metadata)}`

const outputMedia = media => {
    clearTimeout(scrollTimeout)

    if (media.length > MAX_CHAR) scrollText(media)
    else console.log(media)
}

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

const listenForChange = properties => {
    properties.on('PropertiesChanged', (iface, changed, invalidated) =>
        outputMedia(getMedia(changed['Metadata']))
    )
}

getMetadata()
    .then(metadata =>
        outputMedia(getMedia(metadata))
    )

getProperties()
    .then(properties =>
        listenForChange(properties)
    )

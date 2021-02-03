const { getProperties, getMetadata } = require('./dbus')
const { outputMedia } = require('../utils/outputmedia')

const getArtist = metadata => metadata.value['xesam:artist'].value
const getSong = metadata => metadata.value['xesam:title'].value
const getMedia = metadata => `${getArtist(metadata)} - ${getSong(metadata)}`


let currentlyPlayingSong = ''

const listenForChange = properties => {

    properties.on('PropertiesChanged', (iface, changed, invalidated) => {
        const song = getMedia(changed['Metadata'])

        if (song !== currentlyPlayingSong) {
            currentlyPlayingSong = song
            outputMedia(song)
        }

    })
}

const handleMetadata = () => {
    let handlerTimeout = undefined

    const handler = () => {
        getMetadata()
            .then(metadata => {
                if (metadata) {
                    clearTimeout(handlerTimeout)
                    outputMedia(getMedia(metadata))
                }
                else {
                    setTimeout(handler, 5000)
                }
            })
    }

    handler()
}

const handleProperties = () => {
    let handlerTimeout = undefined

    const handler = () => {
        getProperties()
        .then(properties => {
            if (properties) {
                clearTimeout(handlerTimeout)
                listenForChange(properties)
            }
            else {
                setTimeout(handler, 5000)
            }
        })
    }

    handler()
}

handleMetadata()
handleProperties()



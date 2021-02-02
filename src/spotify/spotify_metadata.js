const { getProperties, getMetadata } = require('./dbus')
const { outputMedia } = require('../utils/outputmedia')

const getArtist = metadata => metadata.value['xesam:artist'].value
const getSong = metadata => metadata.value['xesam:title'].value
const getMedia = metadata => `${getArtist(metadata)} - ${getSong(metadata)}`

const listenForChange = properties => {
    properties.on('PropertiesChanged', (iface, changed, invalidated) =>
        outputMedia(getMedia(changed['Metadata']))
    )
}

getMetadata()
    .then(metadata =>
        metadata ? outputMedia(getMedia(metadata)) : ''
    )

getProperties()
    .then(properties =>
        properties ? listenForChange(properties) : ''
    )

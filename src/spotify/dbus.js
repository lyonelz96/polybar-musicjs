const dbus = require('dbus-next')
const bus = dbus.sessionBus()

const SPOTIFY = 'org.mpris.MediaPlayer2.spotify'
const PLAYER = 'org.mpris.MediaPlayer2.Player'
const OBJ = '/org/mpris/MediaPlayer2'
const PROPERTIES = 'org.freedesktop.DBus.Properties'

const getPlayer = () => (
    bus.getProxyObject(SPOTIFY, OBJ)
        .then(obj => obj.getInterface(PLAYER))
)

const getProperties = () => (
    bus.getProxyObject(SPOTIFY, OBJ)
        .then(obj => obj.getInterface(PROPERTIES))
)



module.exports = {
    getPlayer,
    getProperties,
    PLAYER
}

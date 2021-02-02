const { getPlayer } = require('./dbus')

getPlayer()
    .then(player => player.Previous())
    .catch()

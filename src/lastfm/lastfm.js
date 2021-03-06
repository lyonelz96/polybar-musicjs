const { LASTFM_API_KEY, LASTFM_USERNAME } = require('../utils/env')

const axios = require('axios')
const { outputMedia } = require('../utils/outputmedia')

const API_ROOT = 'http://ws.audioscrobbler.com/2.0'
const PARAMS = {
    method: 'user.getRecentTracks',
    format: 'json',
    limit: 1,
    user: LASTFM_USERNAME,
    api_key: LASTFM_API_KEY
}

const getArtist = res => res.data.recenttracks.track[0].artist['#text']
const getSong = res => res.data.recenttracks.track[0].name

const displayCurrentlyPlaying = () => {

    let currentlyPlayingSong = ''

    const fetch = () => {
        axios.get(API_ROOT, {
            params: PARAMS
        })
            .then(res => {
                const song = `${getArtist(res)} - ${getSong(res)}`

                if (song !== currentlyPlayingSong) {
                    outputMedia(song)
                    currentlyPlayingSong = song
                }

            })
            .catch(() => console.log('Media not found'))

        setTimeout(fetch, 5000)
    }

    fetch()
}

displayCurrentlyPlaying()

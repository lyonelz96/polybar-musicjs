require('dotenv').config()

const axios = require('axios')
const { outputMedia } = require('../utils/outputmedia')

const API_KEY = process.env.API_KEY
const USERNAME = process.env.USERNAME

const API_ROOT = 'http://ws.audioscrobbler.com/2.0'
const PARAMS = {
    method: 'user.getRecentTracks',
    format: 'json',
    limit: 1,
    user: USERNAME,
    api_key: API_KEY
}

const getArtist = res => res.data.recenttracks.track[0].artist['#text']
const getSong = res => res.data.recenttracks.track[0].name

axios.get(API_ROOT, {
    params: PARAMS
})
    .then(res => outputMedia(`${getArtist(res)} - ${getSong(res)}`))



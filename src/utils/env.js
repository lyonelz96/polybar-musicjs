const path = require('path')
const ENV_PATH = path.join(__dirname, '..', '..').concat('/.env')

require('dotenv').config({ path: ENV_PATH})

const LASTFM_API_KEY = process.env.LASTFM_API_KEY
const LASTFM_USERNAME = process.env.LASTFM_USERNAME

module.exports = { LASTFM_API_KEY, LASTFM_USERNAME }

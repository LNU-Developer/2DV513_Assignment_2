const path = require('path')
require('dotenv').config({ path: path.join(__dirname) + '/.env' })

const config = require('./config/database.js')
const connection = config.connection

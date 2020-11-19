const apiController = {}
const Database = require('../config/Database.js')

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD
}

const db = new Database(config)
db.connect()

/** Test router to get things started.
 *
 * @param {object} req - request object
 * @param {object} res - result object
 */
apiController.initiate = (req, res) => {
  res.status(200).send('connection')
}

module.exports = apiController

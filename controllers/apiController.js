const apiController = {}
const Database = require('../config/Database.js')

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

const db = new Database(config)
db.connect()

const fs = require('fs')
const readline = require('readline')

/** Test router to get things started.
 *
 * @param {object} req - request object
 * @param {object} res - result object
 */
apiController.initiate = async (req, res) => {
  try {
    // const fileStream = fs.createReadStream('./resources/RC_2007-10.json') // 6584 ms (unstructured)
    const fileStream = fs.createReadStream('./resources/RC_2011-07.json') // 564125 ms (unstructured)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    let count = 0
    let arrayOfJSON = []
    const startDate = Date.now()

    for await (const line of rl) {
      count++
      const data = JSON.parse(line)
      const values = [data.id, data.name, data.parent_id, data.link_id, data.author, data.body, data.subreddit_id, data.subreddit, data.score, data.created_utc]
      arrayOfJSON.push(values)

      if (count > 1000) {
        count = 0
        insertQuery(arrayOfJSON, startDate, false)
        arrayOfJSON = []
      }
    }
    insertQuery(arrayOfJSON, startDate, true)
    res.status(200).send('connection')
  } catch (error) {
    console.log(error)
  }
}

/**
 * Function to perform a query insert into the datbase.
 *
 * @param {Array} arrayOfJSON - Array of data
 * @param {Date} startDate - start date in time
 * @param {boolean} lastBatch - Boolian to determin if this is the last batch or not
 */
async function insertQuery (arrayOfJSON, startDate, lastBatch = false) {
  const sql = 'INSERT INTO tempbig(id, name, parent_id, link_id, author, body, subreddit_id, subreddit, score, created_utc) VALUES ?'
  db.connection.query(
    sql, [arrayOfJSON],
    function (err, result) {
      if (err) throw err
      console.log('Number of records inserted: ' + result.affectedRows)
      if (lastBatch) {
        const endDate = Date.now()
        console.log(endDate - startDate)
      }
    })
}

module.exports = apiController

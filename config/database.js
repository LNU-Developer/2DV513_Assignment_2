const mysql = require('mysql2')
/** Class to connect to database
 *
 */
module.exports = class Database {
  /** Constructor.
   *
   * @param {object} config - config object file
   */
  constructor (config) {
    this.config = config
    this.connection = undefined
  }

  /** Method to connect to database.
   *
   */
  connect () {
    this.connection = mysql.createConnection(this.config)

    this.connection.connect(function (err) {
      if (err) throw err
      console.log('Connected!')
    })
  }
}

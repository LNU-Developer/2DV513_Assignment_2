const mysql = require('mysql2')

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD
}

const connection = mysql.createConnection(config)

connection.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})
module.exports = {
  connection: mysql.createConnection(config)
}

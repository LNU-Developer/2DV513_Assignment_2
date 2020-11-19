const mysql = require('mysql')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname) + '/.env' })

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

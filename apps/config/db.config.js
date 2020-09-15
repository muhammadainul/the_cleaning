'use strict'

require('dotenv').config()

const mysql = require('mysql')

global.conn = mysql.createConnection({
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,  
    host        : process.env.DB_HOST,
    database    : process.env.DB_NAME
})  

module.exports = conn
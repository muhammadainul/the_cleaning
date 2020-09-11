'use strict'

require('dotenv').config()

const port = process.env.PORT || 3001
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const jwt = require('jsonwebtoken')
const http = require('http')		
const conn = require('./app/config/db.config')
const routes = require('./app/routes/index')

const corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(cookieParser())
app.use('/', routes)

// create connection to mysql
conn.connect( function(err){
	if (err) throw err
})

const httpServer = http.createServer(app)
httpServer.listen(port, () => {
	let port = httpServer.address().port
	console.log("Server running on http://localhost:" + port)
})
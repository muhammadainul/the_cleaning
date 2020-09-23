'use strict'

require('dotenv').config()

const port = process.env.PORT || 3001
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http')		
const conn = require('./apps/config/db.config')
const multer = require('multer')
const myConfig = require('./apps/config/config')
const routes = require('./apps/routes/index')
const basepath = 'apps'
// const corsOptions = {
//     origin: "http://localhost:3001"
// };

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(cookieParser())
app.use(express.static((__dirname, '/public')));

// global.storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 	  cb(null,  "uploads/image")
// 	},
// 	filename: (req, file, cb) => {
// 	  cb(null, `${file.originalname}`);
// 	},
//   });

require("./apps/config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes)

global.myConfig = {}
global.__basedir = __dirname
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
	)
	next()
})

// create connection to mysql
conn.connect( function(err){
	if (err) throw err
})

const httpServer = http.createServer(app)
httpServer.listen(port, () => {
	let port = httpServer.address().port
	console.log("Server running on http://localhost:" + port)
})
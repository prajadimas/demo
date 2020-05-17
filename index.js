// index.js

// ==================== BASIC SERVER SETUP ====================== //
// ============================================================== //

// Packages needed
const express = require('express')
const path = require('path')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
require('dotenv').config()

// setting up port used
// const port = process.env.PORT || 80
const port = process.env.PORT || 8989

// All configurations goes here
/* Express static page */
app.use(express.static(path.join(__dirname,'public')))
/* Configuration of the body-parser to get data from POST requests */
// app.use(bodyParser.json({limit: '1mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))

// ================== ROUTES FOR API REQUESTS =================== //
// ============================================================== //

app.get('/', function (req,res) {
  	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  	console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
	res.sendFile(__dirname + '/public/demo.html')
})

io.on('connection', function (socket) {
	console.log('user connected')
  	socket.on('lamp', function (data) {
		console.log('data: ', data)
		io.emit('lampStat', data)	
    		socket.broadcast.emit('sentLog', 'lamp ' + data)
  	})

 	/*
	 *

	socket.on('onLog', function (data) {
    		console.log('log: ', data)
    		socket.broadcast.emit('sentLog', data)
  	})
  	socket.on('onErr', function (data) {
    		console.log('error: ', data)
    		socket.broadcast.emit('sentErr', data)
  	})

	 *
	 */

})

// ====================== SERVER STARTER ======================== //
// ============================================================== //

// listening server
http.listen(port, '0.0.0.0', () => {
	console.log(`Demo has started on port ${port}`)
})

// Export our app for testing purposes
module.exports = app

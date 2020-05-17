// index.js

// ==================== BASIC SERVER SETUP ====================== //
// ============================================================== //

// Packages needed
const express = require('express')
var path = require('path')
var fs = require('fs')
var https = require('https')

var app = express()

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
	// res.sendFile(__dirname + '/public/index_annyang.html')
	res.sendFile(__dirname + '/public/demo.html')
})

// ====================== SERVER STARTER ======================== //
// ============================================================== //

// listening server
https.createServer({
	key: fs.readFileSync('server.key'),
  	cert: fs.readFileSync('server.cert')
}, app)
.listen(port, '0.0.0.0', () => {
// app.listen(port, '0.0.0.0', () => {
	console.log(`Demo has started on port ${port}`)
})

// Export our app for testing purposes
module.exports = app

var connect = require('connect')
var serveStatic = require('serve-static')
var MongoClient = require('mongodb').MongoClient
var sockets = require('socket.io').listen(8100).sockets

// Configures database connection information
const DB_URL = process.env.DB_URL || '127.0.0.1'
const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
const DB_USERNAME = process.env.DB_TABLE || 'chatClient'
const CONNECTION_URL = 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_URL

// Sets up the server to serve the app's static html file
connect().use(serveStatic(__dirname + "/../../client/build")).listen(80, function(error) {
	if (error) return cb(error)

	// Removes root permissions.
	// Root permissions are needed to start the
	// server due to binding port 80.
	var uid = parseInt(process.env.SUDO_UID);
	if (uid) process.setuid(uid);

	console.log('Started node.js server on http://localhost:80')
})

// Connects to the database
MongoClient.connect(CONNECTION_URL, function(error, defaultDb) {
	if (error) throw error

	// Switches to the 'chat' database
	var db = defaultDb.db('chat')

	// When a client connects
	sockets.on('connection', function(socket) {
		// Retrieve the collection of stored chat messages
		var messagesCol = db.collection('messages')

		messagesCol.find().limit(100).sort({ _id: 1 }).toArray(function(error, response) {
			if (error) throw error

			socket.emit(channels.EXISTING_MESSAGES, response)
		})
	})
})

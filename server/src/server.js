var connect = require('connect')
var serveStatic = require('serve-static')
var MongoClient = require('mongodb').MongoClient
var socketio = require('socket.io')

// Set up listening for clients
var socketPort = 8100
if (typeof config !== 'undefined') {
	socketPort = config.socket_port
}
var sockets = socketio.listen(socketPort).sockets

// Configures database connection information
var dbURL, dbUsername, dbPassword
if (typeof config === 'undefined') {
	dbURL = '127.0.0.1'
	dbUsername = 'chatClient'
	dbPassword = 'password'
} else {
	dbURL = config.db_url
	dbUsername = config.db_username
	dbPassword = config.db_password
}
const CONNECTION_URL = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbURL
// Regex for making sure names and messages aren't blank
const WHITESPACE_PATTERN = /^\s*$/

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

	console.log('Connected to database at ' + CONNECTION_URL)

	// Switches to the 'chat' database
	var db = defaultDb.db('chat')

	// When a client connects
	sockets.on('connection', function(client) {
		// Retrieve the collection of stored chat messages
		var messagesCol = db.collection('messages')

		messagesCol.find().limit(100).sort({ _id: 1 }).toArray(function(error, response) {
			if (error) throw error

			client.emit(channels.EXISTING_MESSAGES, response)
		})

		// On the event of a new message being submitted
		client.on(channels.NEW_MESSAGE, function(data) {
			// Make sure the fields are not blank
			if (WHITESPACE_PATTERN.test(data.name) || WHITESPACE_PATTERN.test(data.message)) {
				client.emit(channels.STATUS, statuses.INVALID_INPUT)
			} else {
				// If everything is good, submit the message to all clients
				// and save it to the database
				sockets.emit(channels.NEW_MESSAGE, data)
				messagesCol.insert({ name: data.name, message: data.message })
				console.log('Inserted new message "' + data.message + '".')
				// Send the user a confirmation status
				client.emit(channels.STATUS, statuses.SUCCESSFULLY_SENT)
			}
		})

		// On the event of a client typing in the message field
		client.on(channels.TYPING, function(data) {
			// Tell all clients
			sockets.emit(channels.TYPING, data)
		})
	})
})

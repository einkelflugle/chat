// Initialize a connection with the server
var socket
try {
	var hostname, port
	if (typeof config === 'undefined') {
		// If the config file doesn't exist,
		// assign some default values
		hostname = 'localhost'
		port = 8100
	} else {
		// If it does exist, read the values from it
		hostname = config.socket_hostname
		port = config.socket_port
	}
	socket = io.connect('http://' + hostname + ':' + port)
} catch(error) {
	console.log('Could not connect.')
}

// Render the app, passing the socket in the props
React.render(
	<ChatApp socket={socket} />,
	document.getElementById('container')
)

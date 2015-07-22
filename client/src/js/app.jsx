// Initialize a connection with the server
var socket
try {
	socket = io.connect('http://localhost:8100')
} catch(error) {
	console.log('Could not connect.')
}

// Render the app, passing the socket in the props
React.render(
	<ChatApp socket={socket} />,
	document.getElementById('container')
)

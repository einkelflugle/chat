try {
	var socket = io.connect('http://localhost:8100')
} catch(error) {
	console.log('Could not connect.')
}

socket.on(channels.EXISTING_MESSAGES, function(data) {
	console.log(data)
	React.render(<ChatBox />, document.getElementById('container'))
})
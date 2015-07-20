// Represents a list of available channels for use with socket.io.
// The client and server can only communicate via these channels.
var channels = {
	EXISTING_MESSAGES: 'existing_messages',
	NEW_MESSAGE: 'new_message'
}
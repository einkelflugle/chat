var channels = {
	// Represents a list of available channels for use with socket.io.
	// The client and server can only communicate via these channels.
	EXISTING_MESSAGES: 'existing_messages',
	NEW_MESSAGE: 'new_message',
	STATUS: 'status',
	TYPING: 'typing'
}

var statuses = {
	// Represents a list of available status messages.
	INVALID_INPUT: 'Name or message is invalid.',
	SUCCESSFULLY_SENT: 'Message was sent.'
}

var MessageContainer = React.createClass({
	getInitialState: function() {
		socket.on(channels.EXISTING_MESSAGES, this.loadMessages)
		socket.on(channels.NEW_MESSAGE, this.loadNewMessage)

		return {
			messages: []
		}
	},
	loadMessages: function(data) {
		this.setState({ messages: data })
	},
	loadNewMessage: function(data) {
		var messages = this.state.messages
		messages.push(data)
		this.setState({ messages: messages })
	},
	render: function() {
		var messages = []
		this.state.messages.forEach(function(message) {
			messages.push(<ChatMessage data={message} />)
		})
		return (
			<div class="chat--messages">
				{messages}
			</div>
		)
	}
})
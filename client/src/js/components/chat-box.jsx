var ChatBox = React.createClass({
	getInitialState: function() {
		return {
			messages: [
				{ name: "Max", content: "Hello world!" },
				{ name: "Brodie", content: "Hi there, how are you?" }
			]
		}
	},
	addMessage: function(name, content) {
		var allMessages = this.state.messages
		allMessages.push({ name: name, content: content })
		this.setState({messages: allMessages})
		console.log('added')
	},
	render: function() {
		var chatMessages = []
		console.log('render')
		this.state.messages.forEach(function(message) {
			chatMessages.push(
				<ChatMessage name={message.name} content={message.content} />
			)
		})
		console.log(chatMessages)
		return (
			<div>
				<ul>{chatMessages}</ul>
				<ChatForm onFormSubmit={this.addMessage} />
			</div>
		)
	}
})
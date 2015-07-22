var MessageForm = React.createClass({
	getInitialState: function() {
		return { nameValue: '', messageValue: '', isTyping: false }
	},
	handleNameChange: function(e) {
		this.setState({ nameValue: e.target.value })
	},
	handleMessageChange: function(e) {
		this.setState({ messageValue: e.target.value })
		if (e.target.value.length > 0) {
			// Message field contains text
			if (!this.state.isTyping) {
				this.sendUpdateTyping()
			}
		} else {
			// Message field is blank
			if (this.state.isTyping) {
				this.sendUpdateTyping()
			}
		}
	},
	handleKeyUp: function(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			this.submitChat()
		}
	},
	sendMessage: function(name, message) {
		socket.emit(channels.NEW_MESSAGE, { name: name, message: message })
		console.log('Send message ' + name + ' ' + message)
	},
	sendUpdateTyping: function() {
		console.log(this.state.nameValue)
		socket.emit(channels.TYPING, { name: this.state.nameValue })
		this.setState({ isTyping: !this.state.isTyping })
	},
	submitChat: function(e) {
		if (e) e.preventDefault()
		var name = this.state.nameValue
		var message = this.state.messageValue
		this.sendMessage(name, message)
		this.setState({ messageValue: '' })
		this.sendUpdateTyping()
		React.findDOMNode(this.refs.messageInput).focus();
		return
	},
	render: function() {
		return (
			<div className="chat--form">
				<input type="text" ref="nameInput" onChange={this.handleNameChange} defaultValue="Guest" value={this.state.nameValue} />
				<input type="text" ref="messageInput" onChange={this.handleMessageChange} value={this.state.messageValue} onKeyUp={this.handleKeyUp} />
				<button onClick={this.submitChat}>Submit</button>
			</div>
		)
	}
})
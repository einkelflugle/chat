var ChatClient = React.createClass({
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

var ChatMessage = React.createClass({
	render: function() {
		return (
			<li>{this.props.name}: {this.props.content}</li>
		)
	}
})

var ChatForm = React.createClass({
	getInitialState: function() {
		return { content: '' }
	},
	handleChange: function(e) {
		this.setState({content: e.target.value})
	},
	submitChat: function(e) {
		e.preventDefault()
		var name = 'React'
		var content = this.state.content
		this.props.onFormSubmit(name, content)
		this.state.content = ''
		React.findDOMNode(this.refs.contentField).focus();
		return
	},
	render: function() {
		return (
			<div className="form">
				<input type="text" ref="contentField" onChange={this.handleChange} value={this.state.content} />
				<button onClick={this.submitChat}>Submit</button>
			</div>
		)
	}
})

React.render(<ChatClient />, document.getElementById('container'))

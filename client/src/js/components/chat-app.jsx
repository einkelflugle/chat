var ChatApp = React.createClass({
	render: function() {
		return (
			<div className="chat">
				<h1>Chat</h1>
				<MessageContainer />
				<MessageForm />
				<TypersList />
				<Status />
			</div>
		)
	}
})
var ChatApp = React.createClass({
	render: function() {
		return (
			<div className="chat">
				<h1 className="chat--title">Chat</h1>
				<span className="chat--subtitle">by maxcmiller</span>
				<MessageContainer />
				<MessageForm />
				<TypersList />
				<Status />
			</div>
		)
	}
})
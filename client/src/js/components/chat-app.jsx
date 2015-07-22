var ChatApp = React.createClass({
	render: function() {
		return (
			<div>
				<MessageContainer />
				<MessageForm />
				<TypersList />
				<Status />
			</div>
		)
	}
})
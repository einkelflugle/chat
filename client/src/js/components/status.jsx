var Status = React.createClass({
	getInitialState: function() {
		socket.on(channels.STATUS, this.updateStatus)

		return { status: '' }
	},
	updateStatus: function(data) {
		this.setState({ status: data })
		setTimeout(this.clearStatus, 3000)
	},
	clearStatus: function() {
		this.setState({ status: '' })
	},
	render: function() {
		return <span>{this.state.status}</span>
	}
})
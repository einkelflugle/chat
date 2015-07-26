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
		if (this.state.status !== '') {
			return <span className="container chat--status">{this.state.status}</span>
		} else {
			return null
		}
	}
})
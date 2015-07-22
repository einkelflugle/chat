var ChatMessage = React.createClass({
	getInitialState: function() {
		return { data: this.props.data }
	},
	render: function() {
		return (
			<p>{this.state.data.name}: {this.state.data.message}</p>
		)
	}
})
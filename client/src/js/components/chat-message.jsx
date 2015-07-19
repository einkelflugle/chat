var ChatMessage = React.createClass({
	render: function() {
		return (
			<li>{this.props.name}: {this.props.content}</li>
		)
	}
})
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
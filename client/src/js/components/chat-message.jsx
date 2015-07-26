var ChatMessage = React.createClass({
	getInitialState: function() {
		return { data: this.props.data }
	},
	render: function() {
		console.log(this.state.data)
		return (
			<div className="chat--message">
				<span className="chat--message--name">
					{this.state.data.name}
				</span>
				<span className="chat--message--content">
					{this.state.data.message}
				</span>
				<span className="chat--message--time">
					{DateHelper.time_ago_in_words_with_parsing(this.state.data.when)}
				</span>
			</div>
		)
	}
})
var TypersList = React.createClass({
	getInitialState: function() {
		socket.on(channels.TYPING, this.updateTyper)

		return { typers: [] }
	},
	updateTyper: function(data) {
		// Duplicate the array for modification
		var allTypers = this.state.typers.splice(0)
		var index = allTypers.indexOf(data.name)
		if (index >= 0) {
			// The array contains the new entry
			// i.e. the user is currently typing
			allTypers.splice(index, 1)
			// Remove them from the typing list
		} else {
			// The array doesn't contain the new entry
			// i.e. the user isn't currently typing
			allTypers.push(data.name)
			// Add them to the typing list
		}
		this.setState({ typers: allTypers })
	},
	render: function() {
		var typersString = 'Typing: '
		for (var i = 0; i < this.state.typers.length; i++) {
			typersString += i < this.state.typers.length - 1 ? this.state.typers[i] + ', ' : this.state.typers[i]
		};
		typersString += ' (' + this.state.typers.length + ')'
		return (
			<span className="container chat--typers">{typersString}</span>
		)
	}
})
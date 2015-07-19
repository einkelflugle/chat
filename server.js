var connect = require('connect')
var serveStatic = require('serve-static')
connect().use(serveStatic(__dirname + "/client/build")).listen(80, function(error) {
	if (error) return cb(error)

	// Remove root permissions
	var uid = parseInt(process.env.SUDO_UID);
	if (uid) process.setuid(uid);

	console.log('Started node.js server on http://localhost:80')
})

var connect = require('connect')
var serveStatic = require('serve-static')
server = connect().use(serveStatic(__dirname + "/client/build"))
module.exports = server
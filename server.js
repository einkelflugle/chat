var connect = require('connect')
var serveStatic = require('serve-static')
connect().use(serveStatic(__dirname + "/client/build")).listen(8100)
console.log('Started node.js server on http://localhost:8100')

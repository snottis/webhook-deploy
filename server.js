const webhookMiddleware = require('./webhooks');
const config = require('./config')

let server;

if(config.https.enabled) {
    const proto = require('https');
    const fs = require('fs');
    server = proto.createServer({
        key: fs.readFileSync(config.https.key),
        cert: fs.readFileSync(config.https.cert)
    }, webhookMiddleware)
}
else {
    const proto = require('http');
    server = proto.createServer(webhookMiddleware)
}

module.exports = server
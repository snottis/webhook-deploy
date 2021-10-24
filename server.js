const http = require('http')
const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const config = require('./config.js');
const deploy = require('./deploy');
const webhooks = new Webhooks({
    secret: config.secret,
})

webhooks.onAny(({id, name, payload}) => {
    console.log(name);
    if(name === 'create' && config.development) {
        if(payload.ref_type === 'tag' && RegExp('^dev').test(payload.ref)) {
            deploy.listComposeFiles();
        }
    }
    if(config.production && name === "release" && payload.action === 'released') {
        console.log(payload)
    }
});

module.exports = http.createServer(createNodeMiddleware(webhooks, {path: "/"}))
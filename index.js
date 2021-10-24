const http = require('http')
const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const config = require('./config.js');
const webhooks = new Webhooks({
    secret: process.env.WEBHOOK_SECRET 
})

webhooks.onAny(({id, name, payload}) => {
    console.log(name);
    if(name === "create" && config.development) {
        console.log(payload)
    }
    if(name === "release" && config.production) {
        console.log(payload)
    }
});

http.createServer(createNodeMiddleware(webhooks)).listen(config.port)
const http = require('http')
const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const Queue = require('better-queue');
const config = require('./config.js');
const deploy = require('./deploy');
const webhooks = new Webhooks({
    secret: config.secret,
})

let q = new Queue((obj, cb) => {
    if(obj.event == 'dev') {
        deploy.getDevelopmentFiles(obj.url, obj.ver);
    }
    if(obj.event == 'rel') {
        deploy.getReleaseFiles(obj.url, obj.ver);
    }
})


webhooks.on('create', async ({id, name, payload}) => {
    console.log('Received create event');
})
webhooks.on('create', async ({id, name, payload}) => {
    if(config.development) {
        if(payload.ref_type === 'tag' && RegExp('^dev-').test(payload.ref)) {
            q.push({event: 'dev', url: payload.repository.clone_url, ver: payload.ref});
        }
    }
})

webhooks.on('release.released', async ({id, name, payload}) => {
    console.log('Received release.released event');
})
webhooks.on('release.released', async ({id, name, payload}) => {
    q.push({event: 'rel', url: payload.release.tarball_url, ver: payload.release.name});
})

module.exports = http.createServer(createNodeMiddleware(webhooks, {path: "/"}))
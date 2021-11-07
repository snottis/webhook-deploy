const http = require('http')
const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const config = require('./config.js');
const deploy = require('./deploy');
const webhooks = new Webhooks({
    secret: config.secret,
})


webhooks.on('create', async ({id, name, payload}) => {
    console.log('Received create event');
})
webhooks.on('create', async ({id, name, payload}) => {
    if(config.development) {
        if(payload.ref_type === 'tag' && RegExp('^dev-').test(payload.ref)) {
            await deploy.getDevelopmentFiles(payload.repository.clone_url, payload.ref);
        }
    }
})

webhooks.on('release.released', async ({id, name, payload}) => {
    console.log('Received release.released event');
})
webhooks.on('release.released', async ({id, name, payload}) => {
    await deploy.getReleaseFiles(payload.release.tarball_url, payload.release.name);
})

module.exports = http.createServer(createNodeMiddleware(webhooks, {path: "/"}))
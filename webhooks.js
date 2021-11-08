const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const q = require('./queue.js')
const config = require('./config.js');

const webhooks = new Webhooks({
    secret: config.secret,
})


webhooks.on('create', async ({id, name, payload}) => {
    console.log('Received create event');
    if(config.development) {
        if(payload.ref_type === 'tag' && RegExp('^dev-').test(payload.ref)) {
            q.push({event: 'dev', url: payload.repository.clone_url, ver: payload.ref});
        }
    }
})

webhooks.on('release.released', async ({id, name, payload}) => {
    console.log('Received release.released event');
    if(config.production) {
        q.push({event: 'rel', url: payload.release.tarball_url, ver: payload.release.name});
    }
})

module.exports = createNodeMiddleware(webhooks, {path: '/'});
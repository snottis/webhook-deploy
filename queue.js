const Queue = require('better-queue');
const deploy = require('./deploy');
/*
obj = {
    event: "dev" || "rel"
    url: if event==dev: git clone url || if event==rel release tarball url
    ver: versionname
}
*/
const q = new Queue((obj, cb) => {
    if(obj.event == 'dev') {
        deploy.getDevelopmentFiles(obj.url, obj.ver);
    }
    if(obj.event == 'rel') {
        deploy.getReleaseFiles(obj.url, obj.ver);
    }
})

module.exports = q;
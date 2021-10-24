const { exec } = require("child_process");
const config = require('./config');

const execute = (command) => {
    exec(command, (error, stdout, stderr) => {
        if(error)
            console.log('error:', error)
        if(stdout) 
            console.log('stdout:', stdout)
        if(stderr)
            console.log('stderr', stderr)
    })
}

const listComposeFiles = () => {
    execute('ls -la compose/')
}

const getDevelopmentFiles = (repoUrl, tagRef) => {
    execute('rm -rf ./compose/src');
    execute(`git clone ${repoUrl} ./compose/src`);
    execute(`cd ./compose/src && git fetch --all && git checkout tags/${tagRef} && cd ../..`);
}

const getReleaseFiles = (tarUrl) => {
    execute('rm -rf ./compose/src');
    execute(`curl ${tarUrl} | tar -xvz - -C ./compose/src`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
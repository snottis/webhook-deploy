const { exec } = require("child_process");
const rr = require('rimraf');

const execute = async (command) => {
    exec(command, (error, stdout, stderr) => {
        if(error)
            console.log('error:', error)
        if(stdout) 
            console.log('stdout:', stdout)
        if(stderr)
            console.log('stderr:', stderr)
    })
}

const listComposeFiles = () => {
    execute('ls -la compose/')
}

const getDevelopmentFiles = async (repoUrl, tagRef) => {
    rr('./compose/src');
    await execute(`git clone ${repoUrl} ./compose/src`);
    await execute(`cd ./compose/src && git fetch --all --tags && git checkout tags/${tagRef} && cd ../..`);
}

const getReleaseFiles = async (tarUrl) => {
    rr('./compose/src');
    await execute(`curl ${tarUrl} | tar -xvz - -C ./compose/src`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
const { exec } = require("child_process");
const config = require('./config');

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
    await execute('rm -rf ./compose/src');
    await execute(`git clone ${repoUrl} ./compose/src`);
    await execute(`cd ./compose/src && git fetch --all && git checkout tags/${tagRef} && cd ../..`);
}

const getReleaseFiles = async (tarUrl) => {
    await execute('rm -rf ./compose/src');
    await execute(`curl ${tarUrl} | tar -xvz - -C ./compose/src`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
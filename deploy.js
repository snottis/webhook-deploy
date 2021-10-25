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
    return true;
}

const listComposeFiles = () => {
    execute('cd compose && ls -la && cd ..')
}

const getDevelopmentFiles = async (repoUrl, tagRef) => {
    rr('./compose/src', () => console.log('Purged src'));
    await execute(`git clone ${repoUrl} ./compose/src`);
    await execute(`cd ./compose/src && git fetch --all --tags && git checkout refs/tags/${tagRef} && cd ../..`);
}

const getReleaseFiles = async (tarUrl) => {
    rr('./compose/src', () => console.log('Purged src'));
    await execute(`curl ${tarUrl} | tar -xvz - -C ./compose/src`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
const { execSync } = require("child_process");
const rr = require('fs').rmSync

const execute = async (command) => {
    return execSync(command, (error, stdout, stderr) => {
        if(error)
            console.log('error:', error)
        if(stdout) 
            console.log('stdout:', stdout)
        if(stderr)
            console.log('stderr:', stderr)
    })
}

const listComposeFiles = () => {
    execute('cd compose && ls -la && cd ..')
}

const getDevelopmentFiles = async (repoUrl, tagRef) => {
    rr('./compose/src', {recursive: true, force: true});
    await execute(`git clone ${repoUrl} ./compose/src`);
    await execute(`cd ./compose/src && git fetch --all --tags && git checkout tags/${tagRef} && cd ../..`);
}

const getReleaseFiles = async (tarUrl) => {
    rr('./compose/src', {recursive: true, force: true});
    await execute(`curl ${tarUrl} | tar -xvz  -C ./compose/src`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
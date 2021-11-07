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
    console.log('Fetch all:')
    await execute(`cd ./compose/src && git fetch --all --tags && git checkout 'tags/${tagRef}' && cd ../..`);
    console.log('Deploy dev:')
    await execute(`cd ./compose && bash deploy.sh '${tagRef}'`)
}

const getReleaseFiles = async (tarUrl, version) => {
    rr('./compose/src', {recursive: true, force: true});
    console.log('Fetch release:')
    await execute(`mkdir ./compose/src && curl -L '${tarUrl}' | tar -xvz --strip-components=1  -C ./compose/src`)
    console.log('Deploy release:')
    await execute(`cd ./compose && bash deploy.sh '${version}'`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
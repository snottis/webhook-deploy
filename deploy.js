const { execSync } = require("child_process");
const rr = require('fs').rmSync
const config = require('./config')

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
    rr(`${config.appPath}/src`, {recursive: true, force: true});
    await execute(`git clone ${repoUrl} ${config.appPath}/src`);
    console.log('Fetch all:')
    await execute(`cd ${config.appPath} && git fetch --all --tags && git checkout 'tags/${tagRef}'`);
    console.log('Deploy dev:')
    await execute(`cd ${config.appPath} && bash deploy.sh '${tagRef}'`)
}

const getReleaseFiles = async (tarUrl, version) => {
    rr(`${config.appPath}/src`, {recursive: true, force: true});
    console.log('Fetch release:')
    await execute(`mkdir ${config.appPath}/src && curl -L '${tarUrl}' | tar -xvz --strip-components=1  -C ${config.appPath}/src`)
    console.log('Deploy release:')
    await execute(`cd ${config.appPath} && bash deploy.sh '${version}'`)
}

module.exports = {
    listComposeFiles,
    getDevelopmentFiles,
    getReleaseFiles
}
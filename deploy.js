const { exec } = require("child_process");

const listComposeFiles = () => {
    exec('ls -la compose/', (error, stdout, stderr) => {
        if(error)
            console.log('error:', error)
        if(stdout) 
            console.log('stdout:', stdout)
        if(stderr)
            console.log('stderr', stderr)
    })
}

modules.export = {
    listComposeFiles
}
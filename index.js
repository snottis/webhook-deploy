const config = require('./config')
const server = require('./server.js')
const fs = require('fs');

var keyModified = false;
var certModified = false;
var reloading = false;

reloadCerts = async () => {
    reloading = true;
    while(true)
    {
        try {
            server.setSecureContext(
                {
                    key: fs.readFileSync(config.https.key),
                    cert: fs.readFileSync(config.https.cert)
                }
            );
            keyModified = certModified = reloading = false;

            console.log("Certs reloaded!");
            break;
        } catch(e) {}

        await new Promise (i => setTimeout(i, 100));
    }
}

server.listen(config.port)

if(config.https.enabled){
    fs.watch(config.https.key, {persistent: false}, () =>{
        keyModified = true;
        if(keyModified && !reloading)
            reloadCerts();
    })
    fs.watch(config.https.cert, {persistent: false}, () =>{
        certModified = true;
        if(certModified && !reloading)
            reloadCerts();
    })
}

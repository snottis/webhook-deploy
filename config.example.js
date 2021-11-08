const config = {
    port: process.env.TSS_WEBHOOK_PORT || 3000,
    production: false,
    productionReleasePrefix: 'v',
    development: true,
    developmentTagPrefix: 'dev',
    secret: process.env.TSS_WEBHOOK_SECRET, // You can also replace this with the secret
    https: {
        enabled: false,
        cert: "path/to/cert",
        key: "path/to/key"
    }
}

module.exports = config;
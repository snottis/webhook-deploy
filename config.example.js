const config = {
    port: process.env.TSS_WEBHOOK_PORT || 3000,
    production: false,
    productionReleasePrefix: 'v',
    development: true,
    developmentTagPrefix: 'dev',
    secret: process.env.TSS_WEBHOOK_SECRET
}

module.exports = config;
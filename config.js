const config = {
    production: false,
    productionReleasePrefix: 'v',
    development: true,
    developmentTagPrefix: 'dev',
    productionSecret: process.env.TSS_WEBHOOK_PROD_SECRET || "",
    developmentSecret: process.env.TSS_WEBHOOK_DEV_SECRET || ""
}

module.exports = config;
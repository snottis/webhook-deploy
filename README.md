# webhook-deploy
## How to use
1. Clone repository
2. Copy/move config.example.js -> config.js
3. Edit config.js
    1. appPath is path where your application resides, source will be downloaded to <appPath>/src
    2. production: true enables webhooks on published releases, will only deploy releases with name matching prefix
    3. development: true enables webhooks on created tags, will only deploy tags with matching prefix
    4. secret: your webhook secret
    5. https: if enabled, you must provide cert and private key, be sure to get them first with e.g. certbot
4. Run with something like pm2

# webhook-deploy

## instructions

This is a webhook listener written in Go.
It listens to GitHub registry_package published -events, which happen when for example an image is pushed to GitHub Container Registry. If image tag matches defined set of allowed tags, a bash script is run.

Few environment variables need to be set for this to function:

1. *WEBHOOK_SECRET* contains the secret which will be used to verify webhook payload
2. *WEBHOOK_ACCEPTED_TAGS* contains comma-separated (,) list of *RegExp* matching accepted tags. For example, WEBHOOK_ACCEPTED_TAGS=^dev-,v[0-9].[0-9].[0.9] would match tags starting with _dev_ and all semantic versioning tags (v1.0.2 etc). This has been moved to a separate env file as systemd script file did not like some characters.
3. *WEBHOOK_TLS_KEY* path to TLS-key (to support https)
4. *WEBHOOK_TLS_CERT* path to TLS-cert (for https also)
5. *WEBHOOK_PORT* define port on which to listen for connections.
6. *WEBHOOK_PATH* path where to listen for the webhooks *<hostname/ip>:<WEBHOOK_PORT>/<WEBHOOK_PATH>*

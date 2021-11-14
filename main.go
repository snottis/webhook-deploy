/* This program waits for PackageEvent webhook
which is launched when image is pushed to github
container registry */
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/google/go-github/v40/github"
)

var secret string = os.Getenv("WEBHOOK_SECRET")
var certPath string = os.Getenv("WEBHOOK_TLS_CERT")
var keyPath string = os.Getenv("WEBHOOK_TLS_KEY")
var port string = os.Getenv("WEBHOOK_PORT")

// This function handles the webhook events
func handleWebhook(w http.ResponseWriter, r *http.Request) {
	// First we validate payload with preshared key
	log.Println("Event received")
	payload, err := github.ValidatePayload(r, []byte(secret))
	if err != nil {
		// If keys don't match or other error happens we stop.
		log.Printf("error reading request body: err=%s\n", err)
		return
	}
	defer r.Body.Close()
	// Then we parse the webhook event
	if github.WebHookType(r) != "registry_package" {
		log.Println("Not a package event!")
		return
	}
	action, tag, url := parseRegistryPackageEvent(payload)
	if (!isTagLegit(tag) || action != "published") {
		log.Printf("Will not install tag: %s\n", tag)
		return
	} else {
		go deploy(url)
	}
	
}


func main() {
	log.Println("server started")
	// run handleWebhook on requests to /webhook
	http.HandleFunc("/webhook", handleWebhook)
	err := http.ListenAndServeTLS(":"+port, certPath, keyPath, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
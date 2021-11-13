/* This program waits for PackageEvent webhook
which is launched when image is pushed to github
container registry */
package main

import (
	"log"
	"net/http"

	"github.com/google/go-github/v40/github"
)

// This function handles the webhook events
func handleWebhook(w http.ResponseWriter, r *http.Request) {
	// First we validate payload with preshared key
	payload, err := github.ValidatePayload(r, []byte("devsecret"))
	if err != nil {
		// If keys don't match or other error happens we stop.
		log.Printf("error reading request body: err=%s\n", err)
		return
	}
	defer r.Body.Close()
	// Then we parse the webhook event
	event, err := github.ParseWebHook(github.WebHookType(r), payload)
	if err != nil {
		// If we cant parse it, log error and end.
		log.Printf("could not parse webhook: err=%s\n", err)
		return
	}
	// Do the magic according to event type
	switch e := event.(type) {
	case *github.CreateEvent:
		log.Println(*e)
	case *github.PackageEvent:
		log.Println(*e)
	}
}


func main() {
	log.Println("server started")
	// run handleWebhook on requests to /webhook
	http.HandleFunc("/webhook", handleWebhook)
	// Start server
	log.Fatal(http.ListenAndServe(":8080", nil))
}
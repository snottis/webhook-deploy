package main

import (
	"log"
	"os/exec"
)

func deploy(url string) {
	cmd, err := exec.Command("bash", "deploy.sh", url).Output()
	if err != nil {
		log.Printf("error: %s", err)
	}
	output := string(cmd)
	log.Print(output)
}
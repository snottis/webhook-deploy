package main

import (
	"os"
	"regexp"
	"strings"

	"github.com/tidwall/gjson"
)

var legitTags []string = strings.Split(os.Getenv("WEBHOOK_ACCEPTED_TAGS"), ",")

func parseRegistryPackageEvent(data []byte) (string, string, string) {
	action := gjson.GetBytes(data, "action")
	tag := gjson.GetBytes(data, "registry_package.package_version.container_metadata.tag.name")
	url := gjson.GetBytes(data, "registry_package.package_version.package_url")
	return action.Str, tag.Str, url.Str
}

func isTagLegit (tag string) bool {
	for _, s := range legitTags {
		match, _ := regexp.MatchString(s, tag)
		if match {
			return true
		}
	}
	return false
}
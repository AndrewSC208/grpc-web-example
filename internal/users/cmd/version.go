package cmd

import (
	"fmt"
	"io/ioutil"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version nubmer",
	Run: func(cmd *cobra.Command, args []string) {
		ver := getVersion()

		fmt.Println(ver)
	},
}

// Version Reads the VERSION file at the root of the project and
// increments the minor version, and writes back to the VERSION
// file
func getVersion() string {
	// get version from VERSION file
	VERSION := "./VERSION"
	vBytes, err := ioutil.ReadFile(VERSION)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	version := string(vBytes)

	return version
}

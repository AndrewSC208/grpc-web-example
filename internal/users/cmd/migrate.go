package cmd

import (
	"fmt"
	"users/app"

	"github.com/spf13/cobra"
)

var migrateCmd = &cobra.Command{
	Use: "migrate",
	RunE: func(cmd *cobra.Command, args []string) error {
		// create an instance off the application
		a, err := app.New()
		if err != nil {
			return err
		}
		// close it when the function is complete
		defer a.Close()



		return nil
	},
}

func init() {
	rootCmd.AddCommand(migrateCmd)
}
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var rootCmd = &cobra.Command{
	Use:   "users",
	Short: "Users micro service",
	Run: func(cmd *cobra.Command, args []string) {
		// root command just shows how to use the cli
		cmd.Usage()
	},
}

// Execute is called in the main function and executes the root command
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		// if an error occurs print to standard out, and exit the program
		fmt.Println(err)
		os.Exit(1)
	}
}

var configFile string

// init is triggered when the Execute method is called and is called before Execute() is run. Making it a good place to
// initialize configuration for the application.
func init() {
	cobra.OnInitialize(initConfig)
	rootCmd.PersistentFlags().StringVar(&configFile, "config", "", "config file (default is config.yaml)")
}

// initConfig is the method used to invoke viper for static config files. If a config file is not found then viper will
// look for a file called config.yaml in the root of the project directory
func initConfig() {
	if configFile != "" {
		viper.SetConfigFile(configFile)
	} else {
		// if a config file does not already exist look in the root of the project
		viper.SetConfigName("config")
		viper.AddConfigPath(".")
	}

	viper.AutomaticEnv()

	// read the config file
	if err := viper.ReadInConfig(); err != nil {
		// if an error occurs print to standard out, and exit the program
		fmt.Printf("unable to read config: %v\n", err)
		os.Exit(1)
	}
}

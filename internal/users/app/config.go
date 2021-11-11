package app

import (
	"fmt"
	"github.com/spf13/viper"
)

// Config only holds application configurations/settings it's not responsible for holding
// different layer configuration, or running processes
type Config struct {
	Name string
	SecretKey []byte
}

// InitiConfig initializs the application config struct
func InitiConfig() (*Config, error) {
	// read config file
	config := &Config {
		Name: viper.GetString("Name"),
		SecretKey: []byte(viper.GetString("SecretKey")),
	}

	// validate SecretKey
	if len(config.SecretKey) == 0 {
		return nil, fmt.Errorf("SecretKey must be set")
	}

	// validate Name
	if len(config.Name) == 0 {
		return nil, fmt.Errorf("service name must be set")
	}

	return config, nil
}
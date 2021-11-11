package db

import (
	"fmt"
	"github.com/spf13/viper"
)

// Config object for the database
type Config struct {
	Address string
	Dialect string
}

// InitConfig initializes the config object from viper file
func InitConfig() (*Config, error) {
	config := &Config{
		Address: viper.GetString("db.Address"),
		Dialect: viper.GetString("db.Dialect"),
	}

	// validate Address
	if config.Address == "" {
		return nil, fmt.Errorf("Database Address must be set")
	}
	// validate Dialect
	if config.Dialect == "" {
		return nil, fmt.Errorf("Database Dialect must be set for the orm")
	}

	return config, nil
}

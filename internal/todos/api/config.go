package api

import "github.com/spf13/viper"

// Config is the configuration for the api layer
type Config struct {
	// The port to bind the web application server to
	Port int

	// The number of proxies position in front of the API. This is used to interpret
	// X-Forwarded-For headers.
	ProxyCount int
}

const DefaultPort = 9092

// InitConfig is the function that is used to configure the api
func InitConfig() (*Config, error) {
	config := &Config{
		Port:       viper.GetInt("Port"),
		ProxyCount: viper.GetInt("ProxyCount"),
	}
	if config.Port == 0 {
		config.Port = DefaultPort
	}
	return config, nil
}

package db

import "github.com/jinzhu/gorm"

// Database is wrapping gorm so we can add methods to it
type Database struct {
	*gorm.DB
}

// New creates a new Database object
func New(config *Config) (*Database, error) {

}


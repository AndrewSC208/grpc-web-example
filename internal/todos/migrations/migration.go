package migrations

import (
	"github.com/jinzhu/gorm"
)

// Migration object containing tables to be migrated
type Migration struct {
	Number uint `gorm:"primary_key"`
	Name   string

	Forwards func(db *gorm.DB) error `gorm:"-"`
}

// Migrations is a slice of Migrations that need to be executed
var Migrations []*Migration

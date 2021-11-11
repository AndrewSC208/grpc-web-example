package model

import (
	"crypto/rand"
	"time"
)

// ID for requests
type ID []byte

// NewID returns a new id
func NewID() ID {
	ret := make(ID, 20)
	if _, err := rand.Read(ret); err != nil {
		panic(err)
	}
	return ret
}

type Model struct {
	ID        string     `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:"index" json:"deleted_at"`
}

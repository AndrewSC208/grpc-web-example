package model

import (
	"golang.org/x/crypto/bcrypt"
)

// GeneratePasswordHash creates a []byte array from your password
func GeneratePasswordHash(password []byte) ([]byte, error) {
	return bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
}

// ComparePasswordHash checks if the given password is correct
func ComparePasswordHash(hashedPassword, givenPassword []byte) bool {
	err := bcrypt.CompareHashAndPassword(hashedPassword, givenPassword)
	return err == nil
}

// User is a model for the users table
type User struct {
	Model

	Email string
	HashedPassword []byte
}

// SetPassword hashes your password
func (u *User) SetPassword(password string) error {
	hashed, err := GeneratePasswordHash([]byte(password))
	if err != nil {
		return err
	}
	u.HashedPassword = hashed
	return nil
}

// CheckPassword checks if the password is correct
func (u *User) CheckPassword(password string) bool {
	return ComparePasswordHash(u.HashedPassword, []byte(password))
}
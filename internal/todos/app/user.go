package app

import (
	"strings"

	"github.com/pkg/errors"

	"todos/model"
)

// GetUserByEmail retreives a user based on their email
func (a *App) GetUserByEmail(email string) (*model.User, error) {
	return a.Database.GetUserByEmail(email)
}

// CreateUser validates users information sets the password, and inserts the new user into the db
func (ctx *Context) CreateUser(user *model.User, password string) error {
	if err := ctx.validateUser(user, password); err != nil {
		return err
	}

	if err := user.SetPassword(password); err != nil {
		return errors.Wrap(err, "unable to set user password")
	}
	return ctx.Database.CreateUser(user)
}

// validateUser does a simple validation on the users email, and password
func (ctx *Context) validateUser(user *model.User, password string) *ValidationError {
	// naive email validation
	if !strings.Contains(user.Email, "@") {
		return &ValidationError{"invalid email"}
	}

	if password == "" {
		return &ValidationError{"password is required"}
	}

	return nil
}


package app

import (
	"net/http"

	"todos/db"
	"todos/model"

	"github.com/sirupsen/logrus"
)

// Context represents the global application context
type Context struct {
	Logger        logrus.FieldLogger
	Database      *db.SqlDatabase
	User          *model.User
	RemoteAddress string
}

// WithLogger set the logger in the app context
func (ctx *Context) WithLogger(logger logrus.FieldLogger) *Context {
	ret := *ctx
	ret.Logger = logger
	return &ret
}

// WithRemoteAddress sets the RemoteAddress in the app context
func (ctx *Context) WithRemoteAddress(address string) *Context {
	ret := *ctx
	ret.RemoteAddress = address
	return &ret
}

// WithUser add the user to the context
func (ctx *Context) WithUser(user *model.User) *Context {
	ret := *ctx
	ret.User = user
	return &ret
}

// AuthorizationError returns an error when a user in not authorized
func (ctx *Context) AuthorizationError() *UserError {
	return &UserError{Message: "unauthorized", StatusCode: http.StatusForbidden}
}

package app

import (
	"github.com/spf13/viper"
	"os"
	"todos/db"

	"github.com/sirupsen/logrus"
	runtime "github.com/banzaicloud/logrus-runtime-formatter"
)

// App is the object used to hold the global application state and it's config
type App struct {
	Config   *Config
	Database *db.SqlDatabase
}

// NewContext creates a new context object 
func (a *App) NewContext() *Context {
	return &Context{
		Logger: logrus.New(),
	}
}

// New creates a new application instance
func New() (app *App, err error) {
	// Create a logger
	logger := NewLogger()

	// create empty app object
	app = &App{}

	// initialize app configuration
	app.Config, err = InitConfig()
	if err != nil {
		return nil, err
	}

	// set the config for the db object
	dbConfig, err := db.Configure()
	if err != nil {
		return nil, err
	}

	// create the new db object and assign it to the app struct
	app.Database, err = db.New(dbConfig, logger)
	if err != nil {
		return nil, err
	}

	return app, err
}

func NewLogger() *logrus.Entry {
	logrus.SetFormatter(&runtime.Formatter{ChildFormatter: &logrus.JSONFormatter{}})
	logrus.SetOutput(os.Stdout)

	logger := logrus.WithField("Orion", viper.GetString("ServiceName"))
	logger.Logger.SetLevel(logrus.InfoLevel)

	logger.Info("Starting")
	return logger
}

// Close makes sure that all connections are closed when the application is closed
func (a *App) Close() error {
	return a.Database.Close()
}

type ValidationError struct {
	Message string `json:"message"`
}

func (e *ValidationError) Error() string {
	return e.Message
}

type UserError struct {
	Message    string `json:"message"`
	StatusCode int    `json:"-"`
}

func (e *UserError) Error() string {
	return e.Message
}
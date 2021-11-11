package app

import "fmt"

// App is the object used to hold the global application state, and it's config
type App struct {
	Config *Config
}

// New creates a new application instance
func New() (app *App, err error) {
	app = &App{}

	// create config object
	app.Config, err = InitiConfig()
	if err != nil {
		return nil, err
	}

	return app, nil
}

func (a *App) Close() {
	// TODO -> once you add in the db connection make sure that it's closed
	fmt.Println("closing everything")
}
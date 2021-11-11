package main

import (
	"os"
	
	"counter/app"
)

func main() {
	// todo -> change this to a better way to grab env vars
	port := os.Getenv("SERVICE_PORT")
	name := os.Getenv("SERVICE_NAME")

	// create application
	a := app.New(name, port)

	// start the accplication
	a.Run()
}

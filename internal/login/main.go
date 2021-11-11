package main

import (
	"log"
	"fmt"
	"html/template"
	"net/http"
	"github.com/gorilla/mux"
	// todo -> inspect this package
	// "github.com/ory/hydra/sdk/go/hydra"
)

func main() {
	// TODO ->  read this config from the config.yaml file
	// client, err := hydra.NewSDK(&hydra.Configuration{
	// 	ClientID: "localhost:4444",
	// 	ClientSecret: "",
	// 	EndpointURL: "",
	// 	Scopes: []string{},
	// })
	// if err != nil {
	// 	log.Fatalf("Unable to connect to the Hydra SDK b/s %s", err)
	// }
	r := mux.NewRouter()
	r.HandleFunc("/", handleHome)
	r.HandleFunc("/login", handleLoginGET).Methods("GET")
	r.HandleFunc("/login", handleLoginPOST).Methods("POST")

	// Start http server
	log.Println("Listening on :3000")
	http.ListenAndServe(fmt.Sprintf(":%d", 3000), r)
}

// HomePage defines homepage object
type HomePage struct {
	Title string
}

// 1. setup up the http server so it can render html templates
// Test home, just want to make sure 
func handleHome(w http.ResponseWriter, req *http.Request) {
	// render an html page
	tmpl, err := template.ParseFiles("./templates/home.html")
	if err != nil {
		log.Println(err)
	}

	data := HomePage{
		Title: "Home",
	}

	tmpl.Execute(w, data)
}

// LoginPage defines the login page object
type LoginPage struct {
	Title string
}

// LoginInputs are the inputs for the login form
type LoginInputs struct {
	Username string
	Password string
}

// handleLogin renders the login page
func handleLoginGET(w http.ResponseWriter, req *http.Request) {
	tmpl, err := template.ParseFiles("./templates/login.html")
	if err != nil {
		log.Println(err)
	}

	data := LoginPage {
		Title: "Login",
	}

	tmpl.Execute(w, data)
}

func handleLoginPOST(w http.ResponseWriter, req *http.Request) {
	inputs := LoginInputs {
		Username: req.FormValue("username"),
		Password: req.FormValue("password"),
	}

	// at this point I need to hide the login screen, and call the users service

	fmt.Println(inputs)

	// tmpl, err := template.ParseFiles("./templates/login.html")
	// if err != nil {
	// 	log.Println(err)
	// }

	// data := LoginPage {
	// 	Title: "Login",
	// }

	// tmpl.Execute(w, data)

	return
}


// 3. Render consent
// 4. Render errors
// 5. Callback
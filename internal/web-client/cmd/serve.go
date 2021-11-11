package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(serveCmd)
}

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "starts the backend, and hosts the client-side application",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Start api")
		fmt.Println("Start app")
		fmt.Println("Start api gateway")
		fmt.Println("start db, if db is empty then seed/migrate")

		fmt.Println("Once everything is done the application is ready")

		return nil
	},
}

// func main() {
// 	app := mux.NewRouter()
// 	app.HandleFunc("/", index).Methods("GET")

// 	// serve static assets
// 	fs := http.FileServer(http.Dir("./build/"))
// 	http.Handle("/static/", http.StripPrefix("/", fs))

// 	// Start http server
// 	log.Println("Listening on :80")
// 	http.ListenAndServe(fmt.Sprintf(":%d", 80), app)
// }

// type IndexPage struct {
// 	Title string
// }

// func index(w http.ResponseWriter, req *http.Request) {
// 	// render index
// 	tmpl, err := template.ParseFiles("./build/index.html")
// 	if err != nil {
// 		log.Println(err)
// 	}

// 	data := IndexPage{
// 		Title: "Counter",
// 	}

// 	tmpl.Execute(w, data)
// }

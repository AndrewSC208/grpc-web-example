package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func main() {
	// get the new version
	version, err := Version()
	check(err)

	// read all dirs in gen/web
	files, err := ioutil.ReadDir("./gen/web")
	check(err)

	// for each dir in gen/web
	for _, file := range files {
		if file.IsDir() {
			name := file.Name()
			pkgName := fmt.Sprintf("%s_rpc_service", name)
			main := fmt.Sprintf("%s_grpc_web_pb.js", name)
			desc := "Generated rpc transport layer"
			auth := "Andrew Meiling"
			lic := "ISC"
			filePath := fmt.Sprintf("./gen/web/%s/package.json", name)

			// create package.json file
			pkg := Package{
				Name:        pkgName,
				Version:     version,
				Description: desc,
				Main:        main,
				Author:      auth,
				License:     lic,
				Scripts: Scripts{
					Test: "echo \"Error: no test specified\" && exit 1",
				},
				Dependencies: Dependencies{
					GoogleProtobuf: "^3.8.0-rc.1",
					GrpcWeb:        "^1.0.4",
				},
			}

			// marshal json with an indent
			b, err := json.MarshalIndent(pkg, "", "\t")
			check(err)

			// create file
			err = ioutil.WriteFile(filePath, b, 0644)
			check(err)
		}
	}
}

// Package layout for json gen
type Package struct {
	Name         string       `json:"name"`
	Version      string       `json:"version"`
	Description  string       `json:"description"`
	Main         string       `json:"main"`
	Author       string       `json:"author"`
	License      string       `json:"license"`
	Scripts      Scripts      `json:"scripts"`
	Dependencies Dependencies `json:"dependencies"`
}

// Scripts holds all scripts that can be run in the Package
type Scripts struct {
	Test string
}

// Dependencies holds all deps the Package file will need
type Dependencies struct {
	GoogleProtobuf string `json:"google-protobuf"`
	GrpcWeb        string `json:"grpc-web"`
}

// check errors
func check(e error) {
	if e != nil {
		panic(e)
	}
}

// Version Reads the VERSION file at the root of the project and
// increments the minor version, and writes back to the VERSION
// file
func Version() (string, error) {
	// get version from VERSION file
	VERSION := "../VERSION"
	vBytes, err := ioutil.ReadFile(VERSION)
	check(err)
	version := string(vBytes)

	// increment build
	old := strings.Split(version, ".")
	im, err := strconv.Atoi(old[2])
	check(err)
	im++
	new := strconv.Itoa(im)
	newVersion := []string{old[0], old[1], new}
	newVersionStr := strings.Join(newVersion[:], ".")

	// open VERSION file
	f, err := os.Create(VERSION)
	check(err)
	defer f.Close()

	// write newVersion number to VERSION file
	_, err = f.WriteString(newVersionStr)
	check(err)

	// return version string
	return newVersionStr, nil
}

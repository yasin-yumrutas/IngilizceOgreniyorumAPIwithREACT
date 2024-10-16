package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	wd, err := os.Getwd()
	if err != nil {
		log.Println(err)
	}

	buildPath := filepath.Join(wd, "my-app", "build")
	// fs := http.FileServer(http.Dir(buildPath))
	// http.Handle("/", fs)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		if r.URL.Path != "/"{
			http.ServeFile(w,r,filepath.Join(buildPath,"index.html"))
		}
		http.ServeFile(w,r,filepath.Join(buildPath,"index.html"))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server is running on port %s...\n", port)
	http.ListenAndServe(":"+port, nil)
}

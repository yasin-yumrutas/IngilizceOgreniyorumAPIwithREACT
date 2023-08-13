package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("my-app/build"))
	http.Handle("/", fs)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	fmt.Printf("Server is running on port %s...\n", port)
	http.ListenAndServe(":"+port, nil)
}

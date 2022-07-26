package main

import (
	"log"
	"net/http"
	"server/server"
)

/*
	takes a function and returns a function that calls the given function
	with some global modifications
*/
func ForwardRequestTo(f func(res http.ResponseWriter, req *http.Request)) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		log.Printf("\nConnection from\n [%s]\nOn\n [%s]\n\n", req.RemoteAddr, req.URL)
		res.Header().Set("Access-Control-Allow-Origin", "*")
		f(res, req)
	}
}

func main() {
	http.HandleFunc(server.GetitemsNamePath, ForwardRequestTo(server.GetItemsName))
	http.HandleFunc(server.GetitemsPath, ForwardRequestTo(server.GetItem))
	http.HandleFunc(server.CreateProjectPath, ForwardRequestTo(server.CreateProject))

	http.HandleFunc("/favicon.ico", func(res http.ResponseWriter, req *http.Request) {
		http.ServeFile(res, req, "icon.png")
	})

	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		http.Redirect(res, req, "/get/web/html/home.html", http.StatusMovedPermanently)
	})

	http.ListenAndServe(":3456", nil)
}

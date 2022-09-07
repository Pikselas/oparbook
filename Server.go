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
		log.Printf("\nConnection from\n [%s]\nOn\n [%s]", req.RemoteAddr, req.URL)
		res.Header().Set("Access-Control-Allow-Origin", "*")
		f(res, req)
	}
}

func main() {
	http.HandleFunc(server.Getitemsnamepath, ForwardRequestTo(server.GetItemsName))
	http.HandleFunc(server.Getitemspath, ForwardRequestTo(server.GetItem))

	http.HandleFunc("/favicon.ico", func(res http.ResponseWriter, req *http.Request) {
		http.ServeFile(res, req, "icon.png")
	})

	http.ListenAndServe(":3456", nil)
}

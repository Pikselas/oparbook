package main

import (
	"log"
	"net/http"
	"server/server"
)

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
	http.ListenAndServe(":3456", nil)
}

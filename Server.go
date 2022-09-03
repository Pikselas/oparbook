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
	http.HandleFunc("/path/", ForwardRequestTo(server.GetItemsName))
	http.ListenAndServe(":3456", nil)
}

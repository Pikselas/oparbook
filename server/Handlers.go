package server

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

/*
	if no path is provided then returns all the drives/partitions available
	else returns the contents of that path
*/
func GetItemsName(res http.ResponseWriter, req *http.Request) {

	type PathResultType struct {
		Name  string
		IsDir bool
	}
	if req.URL.Path == Getitemsnamepath {
		driveList := make([]PathResultType, 0)
		for _, drive := range "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
			if _, err := os.Stat(string(drive) + "://"); err == nil {
				driveList = append(driveList, PathResultType{string(drive) + ":", true})
			}
		}
		j, _ := json.Marshal(driveList)
		io.WriteString(res, string(j))
	} else {
		Path := req.URL.Path[len(Getitemsnamepath):]
		Items, _ := filepath.Glob(Path + "/*")
		io.WriteString(res, "[")
		for indx, it := range Items {
			fi, _ := os.Stat(it)
			j, _ := json.Marshal(PathResultType{filepath.Base(it), fi.IsDir()})
			io.WriteString(res, string(j))
			if indx != len(Items)-1 {
				io.WriteString(res, ",")
			}
		}
		io.WriteString(res, "]")
	}
}

/*
	returns data of the file that has been provided
*/
func GetItem(res http.ResponseWriter, req *http.Request) {
	Path := req.URL.Path[len(Getitemspath):]
	http.ServeFile(res, req, Path)
}

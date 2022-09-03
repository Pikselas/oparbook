package server

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func GetItemsName(res http.ResponseWriter, req *http.Request) {

	type PathResultType struct {
		Name  string
		IsDir bool
	}

	if req.URL.Path == Getitemsnamepath {
		j, _ := json.Marshal([]PathResultType{{"D:", true}, {"E:", true}})
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

func GetItem(res http.ResponseWriter, req *http.Request) {
	Path := req.URL.Path[len(Getitemspath):]
	http.ServeFile(res, req, Path)
}

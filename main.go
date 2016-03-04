package main

import (
	"github.com/gorilla/mux"
	"github.com/gorilla/schema"
	"github.com/sirsean/panicsms/sms"
	"html/template"
	"log"
	"net/http"
)

var postDecoder = schema.NewDecoder()

func main() {
	log.Println("starting panicsms")

	router := mux.NewRouter()
	router.HandleFunc("/", index).Methods("GET")
	router.HandleFunc("/newAlert", index).Methods("GET")

	router.HandleFunc("/api/send", send).Methods("POST")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("/src/github.com/sirsean/panicsms/static/")))
	http.Handle("/", router)

	sms.Connect()

	log.Fatal(http.ListenAndServe(":80", nil))
}

func send(w http.ResponseWriter, r *http.Request) {
	type Form struct {
		To   string
		Body string
	}

	r.ParseForm()
	form := new(Form)
	postDecoder.Decode(form, r.PostForm)

	err := sms.Send(form.To, form.Body)
	if err != nil {
		http.NotFound(w, r)
		return
	}
}

var indexTemplate = template.Must(template.ParseFiles("/src/github.com/sirsean/panicsms/template/index.html"))

func index(w http.ResponseWriter, r *http.Request) {
	indexTemplate.Execute(w, nil)
}

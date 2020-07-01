package main

import (
	"encoding/json"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func main() {
	r := gin.Default()

	// load all html files directly in assets as templates - this is so they can be serverd via c.HTML below.
	r.LoadHTMLGlob("assets/*.html")

	// serve the client websocket
	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	// serve static files under localhost:8080/assets - this is for css and js
	r.Static("/assets", "./assets")

	// serve index.html by default
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	r.Run(":8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type User struct {
	Name       string
	Connection *websocket.Conn
}

type Message struct {
	MessageType string `json:"type"`
	Room        string `json:"room"`
	UserName    string `json:"name"`
	Payload     string `json:"payload"`
}

type RegistrationResult struct {
	MessageType string `json:"type"`
	Result      string `json:"result"`
}

var openConnections = make(map[string]map[string]*websocket.Conn)

func register(message *Message, connection *websocket.Conn) (RegistrationResult, error) {

	userMap := openConnections[message.Room]
	if userMap == nil {
		userMap = make(map[string]*websocket.Conn)
	}
	userMap[message.UserName] = connection

	log.Printf("Registered user %s in room %s", message.UserName, message.Room)

	result := RegistrationResult{
		MessageType: "registration",
		Result:      "success",
	}
	return result, nil
}

func submitStory(message *Message) {

}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Error(err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}

		var message Message
		err = json.Unmarshal(msg, &message)
		if err != nil {
			log.Error(err)
			return
		}

		switch message.MessageType {
		case "registration":
			result, err := register(&message, conn)
			if err != nil {
				log.Error(err)
				return
			}

			marshalled, err := json.Marshal(result)
			if err != nil {
				log.Error(err)
				return
			}

			conn.WriteMessage(t, marshalled)

		case "submit_story":
			submitStory(&message)

			// Use conn to send and receive messages.
			conn.WriteMessage(t, msg)
		}

	}
}

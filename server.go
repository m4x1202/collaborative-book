package main

import (
	"encoding/json"
	"net/http"
	"sync"

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
		go wshandler(c.Writer, c.Request)
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

type ClientMessage struct {
	MessageType string `json:"type"`
	Room        string `json:"room"`
	UserName    string `json:"name"`
	Payload     string `json:"payload"`
}

type RegistrationResult struct {
	MessageType string `json:"type"`
	Result      string `json:"result"`
}

type UserStoryStage struct {
	UserName string
	Story    string
}

type Room struct {
	StoryStages []UserStoryStage
	UserMap     map[string]*websocket.Conn
}

var openConnectionMutex sync.Mutex
var openConnections = make(map[string]map[string]*websocket.Conn)

func debugPrintOpenConnections() {
	for room, userMap := range openConnections {
		for name, connection := range userMap {
			log.Tracef("Room: %s, Name: %s, Connection %v", room, name, connection)
		}
	}
}

func register(message *ClientMessage, connection *websocket.Conn) (RegistrationResult, error) {

	openConnectionMutex.Lock()
	defer openConnectionMutex.Unlock()

	if openConnections[message.Room] == nil {
		openConnections[message.Room] = make(map[string]*websocket.Conn)
	}
	openConnections[message.Room][message.UserName] = connection

	log.Printf("Registered user %s in room %s", message.UserName, message.Room)

	debugPrintOpenConnections()

	result := RegistrationResult{
		MessageType: "registration",
		Result:      "success",
	}
	return result, nil
}

func submitStory(message *ClientMessage) {

}

type UserUpdateMessage struct {
	MessageType string   `json:"type"`
	UserList    []string `json:"user_list"`
}

func sendConnectedUsersUpdate(messageType int, room string) error {
	message := UserUpdateMessage{
		MessageType: "user_update", // TODO change to actual type
	}

	for userName := range openConnections[room] {
		message.UserList = append(message.UserList, userName)
	}

	marshalled, err := json.Marshal(message)
	if err != nil {
		return err
	}

	for _, connection := range openConnections[room] {
		connection.WriteMessage(messageType, marshalled)
	}

	return nil
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

		log.Print("In Loop")

		var message ClientMessage
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

			err = sendConnectedUsersUpdate(t, message.Room)
			if err != nil {
				log.Error(err)
				return
			}

		case "submit_story":
			submitStory(&message)

			// Use conn to send and receive messages.
			conn.WriteMessage(t, msg)
		}
	}

	log.Print("End")

}

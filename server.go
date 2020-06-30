package main

import (
    "github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
    "fmt"
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

func wshandler(w http.ResponseWriter, r *http.Request) {
    conn, err := wsupgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println("Failed to set websocket upgrade: %+v", err)
        return
    }

    for {
        t, msg, err := conn.ReadMessage()
        if err != nil {
            break
		}
		
		// Use conn to send and receive messages.
        conn.WriteMessage(t, msg)
    }
}
package main

import (
	"log"
	"calendar-app/handlers"  // パスを修正
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.Default()

	// CORSの設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	// ルーティング
	r.GET("/events", handlers.GetEvents)
	r.POST("/events", handlers.CreateEvent)
	r.PUT("/events/:id", handlers.UpdateEvent)
	r.DELETE("/events/:id", handlers.DeleteEvent)

	log.Fatal(r.Run(":8080"))
}

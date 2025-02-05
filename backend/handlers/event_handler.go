package handlers

import (
	"net/http"
	"calendar-app/models"
	"github.com/gin-gonic/gin"
)

func GetEvents(c *gin.Context) {
	var events []models.Event
	// DBから取得する処理を実装
	c.JSON(http.StatusOK, events)
}

func CreateEvent(c *gin.Context) {
	var event models.Event
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// DBに保存する処理を実装
	c.JSON(http.StatusCreated, event)
}

func UpdateEvent(c *gin.Context) {
	// 更新処理を実装
}

func DeleteEvent(c *gin.Context) {
	// 削除処理を実装
}

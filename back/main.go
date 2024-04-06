package main

import (
	"back/db"
	"back/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	router := gin.Default()
	routes.RegisterRoutes(router)
	router.Run(":8080")
}

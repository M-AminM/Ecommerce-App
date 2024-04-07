package routes

import (
	"back/middlewares"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	mainServer := server.Group("/")
	mainServer.Use(middlewares.CORSMiddleware())
	mainServer.POST("/users", createUser)
	mainServer.GET("/products", getProducts)
}

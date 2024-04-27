package routes

import (
	"back/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60, // Maximum value not ignored by any of major browsers
	}))

	server.POST("/signup", createUser)
	server.POST("/login", loginUser)
	server.GET("/products", getProducts)
	server.GET("/products/:id", getProductById)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)
	authenticated.POST("/cart", addCart)
	authenticated.GET("/cart", getCart)
	authenticated.GET("/user/:id", getUserById)
}

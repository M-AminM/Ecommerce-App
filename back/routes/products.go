package routes

import (
	"back/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getProducts(context *gin.Context) {
	products, err := models.GetAllProducts()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch events. Try again later."})
		return
	}
	context.JSON(http.StatusOK, products)
}

package routes

import (
	"back/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getProducts(context *gin.Context) {
	products, err := models.GetAllProducts()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch events. Try again later."})
		return
	}

	categoryId := context.Query("categoryId")

	if categoryId != "" {
		productId, err := strconv.ParseInt(categoryId, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse product id"})
			return
		}

		product, err := models.GetProductsByCategoryId(productId)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "success", "isSuccess": true, "data": product})
	} else {
		context.JSON(http.StatusOK, products)
	}
}

func getProductById(context *gin.Context) {
	productId, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse product id"})
		return
	}

	product, err := models.GetProductById(productId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success", "isSuccess": true, "data": product})
}

package routes

import (
	"back/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func addCart(context *gin.Context) {
	var cart models.Cart

	err := context.ShouldBindJSON(&cart)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "some fields are missing"})
		return
	}

	err = models.AddCart(cart)
	fmt.Println(err)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create cart"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "cart created", "cart": cart})
}

func getCart(context *gin.Context) {
	user_id := context.Query("user_id")

	if user_id != "" {
		userId, err := strconv.ParseInt(user_id, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse user id"})
			return
		}

		cart, err := models.GetCart(userId)
		fmt.Println(err)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "success", "products": cart})
	} else {
		context.JSON(http.StatusOK, gin.H{"message": "data not found"})
	}
}

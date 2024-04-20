package routes

import (
	"back/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func addCart(context *gin.Context) {
	var cart models.Cart

	err := context.ShouldBindJSON(&cart)
	fmt.Println(err)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "some fields are missing"})
		return
	}

	err = models.AddCart(cart)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create cart"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "cart created", "cart": cart})
}

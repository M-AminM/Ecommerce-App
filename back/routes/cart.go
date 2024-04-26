package routes

import (
	"back/models"
	"back/utils"
	"fmt"
	"net/http"

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

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create cart"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "cart created", "cart": cart})
}

func getCart(context *gin.Context) {
	// user_id := context.Query("user_id")
	token := context.Request.Header.Get("Authorization")

	claims, _ := utils.ExtractClaimsFromToken(token)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	fmt.Println(claims)

	// if user_id != "" {
	// userId, err := strconv.ParseInt(user_id, 10, 64)

	// if err != nil {
	// 	context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse user id"})
	// 	return
	// }

	cart, err := models.GetCart(claims.UserID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
		return
	}

	carts, err := models.GetAllCart(int64(cart.Id))
	// fmt.Println(err)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"cart": carts})
	// } else {
	// 	context.JSON(http.StatusOK, gin.H{"message": "data not found"})
	// }
}

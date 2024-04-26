package routes

import (
	"back/models"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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
	user_id := context.Query("user_id")
	token := context.Request.Header.Get("Authorization")

	dsa, _ := extractClaims(token)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	fmt.Println(dsa)

	if user_id != "" {
		userId, err := strconv.ParseInt(user_id, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse user id"})
			return
		}

		cart, err := models.GetCart(userId)
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
	} else {
		context.JSON(http.StatusOK, gin.H{"message": "data not found"})
	}
}

func extractClaims(tokenStr string) (jwt.MapClaims, bool) {
	hmacSecretString := "supersecret"
	hmacSecret := []byte(hmacSecretString)
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// check token signing method etc
		return hmacSecret, nil
	})

	if err != nil {
		return nil, false
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, true
	} else {
		log.Printf("Invalid JWT Token")
		return nil, false
	}
}

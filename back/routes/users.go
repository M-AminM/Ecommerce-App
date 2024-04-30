package routes

import (
	"back/models"
	"back/utils"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func createUser(context *gin.Context) {
	var user models.User

	err := context.ShouldBindJSON(&user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "some fields are missing"})
		return
	}

	err = models.CreateNewUser(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create user"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "user created", "user": user})
}

func loginUser(context *gin.Context) {
	var user models.User

	err := context.ShouldBindJSON(&user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse request data"})
		return
	}

	user_id, err := models.ValidateUser(user)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "could not authenticate user"})
		return
	}

	token, err := utils.GenerateToken(user.Email, user_id)
	fmt.Println(err)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not authenticate user"})
		return
	}

	var data struct {
		token   string
		user_id int
	}

	data.token = token
	data.user_id = user_id

	context.JSON(http.StatusOK, gin.H{"message": "login successful", "isSuccess": true, "data": data})
}

func getUserById(context *gin.Context) {
	user_id, err := strconv.ParseInt(context.Param("id"), 10, 64)
	// token := context.Request.Header.Get("Authorization")

	// claims, ok := utils.ExtractClaimsFromToken(token)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse product id"})
		return
	}

	user, err := models.GetUserById(user_id)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success", "isSuccess": true, "data": user})
}

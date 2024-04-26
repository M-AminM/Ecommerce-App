package routes

import (
	"back/models"
	"back/utils"
	"fmt"
	"net/http"

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

	err = models.ValidateUser(user)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "could not authenticate user"})
		return
	}

	token, err := utils.GenerateToken(user.Email, user.Id)
	fmt.Println(err)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not authenticate user"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "login successful", "token": token})
}

package routes

import (
	"back/models"
	"back/utils"
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

	token := context.Request.Header.Get("Authorization")

	claims, _ := utils.ExtractClaimsFromToken(token)

	err = models.AddCart(cart, claims.UserID)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not create cart"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "cart created", "isSuccess": true, "data": cart})
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
		context.JSON(http.StatusOK, gin.H{"message": "your cart is empty", "isSuccess": true, "data": []interface{}{}})
		return
	}

	carts, err := models.GetAllCart(int64(cart.Id))
	fmt.Println("err 2 :  ", err)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not fetch data"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success", "isSuccess": true, "data": carts})
	// } else {
	// 	context.JSON(http.StatusOK, gin.H{"message": "data not found"})
	// }
}

func deleteCartItemById(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")

	claims, _ := utils.ExtractClaimsFromToken(token)

	product_id, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "could not parse product id"})
		return
	}

	id, err := models.CheckUserProductExists(claims.UserID, product_id)

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"message": "data not found"})
		return
	}

	err = models.DeleteCartItem(id)
	fmt.Println(err)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "something wrong happen"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "successfuly deleted"})
}

func updateCart(context *gin.Context) {
	var updateCart models.UpdateCart
	err := context.ShouldBind(&updateCart)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "some fields are missing"})
		return
	}

	token := context.Request.Header.Get("Authorization")
	claims, _ := utils.ExtractClaimsFromToken(token)

	_, err = models.CheckUserProductExists(claims.UserID, int64(updateCart.Product_id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "data not found"})
		return
	}

	err = models.CheckProductQuantity(updateCart)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "quantity has mistake"})
		return
	}

	err = models.UpdateCartItem(updateCart, int(claims.UserID))

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "could not update data"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "successfully updated"})

}

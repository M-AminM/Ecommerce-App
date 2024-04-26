package utils

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const secretKey = "supersecret"

type UserClaims struct {
	UserID int64
	Email  string
}

func GenerateToken(email string, user_id int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":   email,
		"user_id": user_id,
		"exp":     time.Now().Add(time.Hour * 2).Unix(),
	})
	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) error {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return errors.New("could not parse token")
	}

	tokenIsValid := parsedToken.Valid
	if !tokenIsValid {
		return errors.New("invalid token")
	}

	return nil
}

func ExtractClaimsFromToken(tokenStr string) (*UserClaims, bool) {
	hmacSecret := []byte(secretKey)
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return hmacSecret, nil
	})

	if err != nil {
		return nil, false
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID, err := strconv.ParseInt(fmt.Sprint(claims["user_id"]), 10, 64)
		if err != nil {

			return nil, false
		}

		email, ok := claims["email"].(string)
		if !ok {
			return nil, false
		}

		userClaims := &UserClaims{
			UserID: userID,
			Email:  email,
		}

		return userClaims, true
	} else {
		return nil, false
	}
}

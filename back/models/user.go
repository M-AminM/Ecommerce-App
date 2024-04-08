package models

import (
	"back/db"
	"time"
)

type User struct {
	Id         int
	Email      string `binding:"required"`
	Password   string `binding:"required"`
	Created_At time.Time
}

func CreateNewUser(user User) error {
	insert, err := db.DB.Query(`INSERT INTO users (email,password) VALUES (?,?)`, user.Email, user.Password)
	if err != nil {
		return err
	}

	defer insert.Close()
	return nil
}

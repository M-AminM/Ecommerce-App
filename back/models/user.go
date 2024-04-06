package models

import (
	"back/db"
	"time"
)

type User struct {
	Id         int
	Name       string `binding:"required"`
	Email      string `binding:"required"`
	Password   string `binding:"required"`
	Created_At time.Time
}

func CreateNewUser(user User) error {
	insert, err := db.DB.Query(`INSERT INTO users (name,email,password) VALUES (?,?,?)`, user.Name, user.Email, user.Password)
	if err != nil {
		return err
	}

	defer insert.Close()
	return nil
}

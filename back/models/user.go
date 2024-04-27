package models

import (
	"back/db"
	"back/utils"
	"database/sql"
	"errors"
	"time"
)

type User struct {
	Id         int       `json:"id"`
	Email      string    `binding:"required" json:"email"`
	Password   string    `binding:"required" json:"password"`
	Created_At time.Time `json:"json:created_at"`
}

func CreateNewUser(user User) error {

	row := db.DB.QueryRow("SELECT id, email FROM users WHERE email=?", user.Email)
	var userFound User
	err := row.Scan(&userFound.Id, userFound.Email)

	if err != sql.ErrNoRows {
		return err
	}

	hashPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}

	insert, err := db.DB.Query(`INSERT INTO users (email,password) VALUES (?,?)`, user.Email, hashPassword)
	if err != nil {
		return err
	}

	defer insert.Close()
	return nil
}

func ValidateUser(user User) (int, error) {
	row := db.DB.QueryRow("SELECT id, password FROM users WHERE email=?", user.Email)

	var retrievedPassword string
	err := row.Scan(&user.Id, &retrievedPassword)

	if err != nil {
		return 0, err
	}

	passwordIsValid := utils.CheckPasswordHash(user.Password, retrievedPassword)
	if !passwordIsValid {
		return 0, errors.New("credentials invalid")
	}

	return user.Id, nil

}

func GetUserById(user_id int64) (*User, error) {
	row := db.DB.QueryRow("SELECT id, email FROM users WHERE id=?", user_id)

	var user User
	err := row.Scan(&user.Id, &user.Email)

	if err != nil {
		return nil, err
	}
	return &user, nil
}

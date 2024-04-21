package models

import (
	"back/db"
	"database/sql"
	"errors"
)

type Cart struct {
	Id           int
	User_Id      int     `binding:"required"`
	Product_Id   int     `binding:"required"`
	Quantity     int     `binding:"required"`
	Total_Amount float64 `binding:"required"`
	Created_At   interface{}
}

func AddCart(cart Cart) error {
	var existingUserID int
	err := db.DB.QueryRow("SELECT user_id FROM cart WHERE user_id = ?", cart.User_Id).Scan(&existingUserID)
	// fmt.Println(existingUserID)
	if err != nil {
		if err == sql.ErrNoRows {
			// Not Found
			insert1, err := db.DB.Query(`INSERT INTO cart (user_id) VALUES (?)`, cart.User_Id)
			if err != nil {
				return err
			}
			defer insert1.Close()

			insert2, err := db.DB.Query(`INSERT INTO cart_users (cart_id, user_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?, ?)`, cart.Id, cart.User_Id, cart.Product_Id, cart.Quantity, cart.Total_Amount)

			if err != nil {
				return err
			}

			defer insert2.Close()
			return nil

		}
		return errors.New("Hi")
	}

	insert, err := db.DB.Query(`INSERT INTO cart_users (cart_id, user_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?, ?)`, existingUserID, cart.User_Id, cart.Product_Id, cart.Quantity, cart.Total_Amount)

	if err != nil {
		return err
	}

	defer insert.Close()
	return nil

}

func GetCart(user_id int64) ([]Cart, error) {
	rows, err := db.DB.Query("SELECT * from cart where user_id=?", user_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	carts := []Cart{}
	for rows.Next() {
		var cart Cart
		err = rows.Scan(&cart.Id, &cart.User_Id, &cart.Product_Id, &cart.Quantity, &cart.Total_Amount, &cart.Created_At)

		if err != nil {
			return nil, err
		}

		carts = append(carts, cart)
	}
	return carts, nil

}

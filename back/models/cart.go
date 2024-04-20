package models

import (
	"back/db"
	"time"
)

type Cart struct {
	Cart_Id      int
	User_Id      int     `binding:"required"`
	Product_Id   int     `binding:"required"`
	Total_Amount float64 `binding:"required"`
	Created_At   time.Time
}

func AddCart(cart Cart) error {
	result, err := db.DB.Exec(`INSERT INTO cart (user_id, product_id, total_amount) VALUES (?, ?, ?)`, cart.User_Id, cart.Product_Id, cart.Total_Amount)
	if err != nil {
		return err
	}

	// Get the auto-generated cart_id
	cartID, err := result.LastInsertId()
	if err != nil {
		return err
	}

	// Insert into the cart_users table using the auto-generated cart_id
	_, err = db.DB.Exec(`INSERT INTO cart_users (cart_id, id) VALUES (?, ?)`, cartID, cart.User_Id)
	if err != nil {
		return err
	}

	return nil
}

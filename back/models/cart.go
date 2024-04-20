package models

import (
	"back/db"
	"time"
)

type Cart struct {
	Cart_Id      int       `json:"cart_id"`
	User_Id      int       `json:"user_id"`
	Product_Id   int       `json:"product_id"`
	Total_Amount float64   `json:"total_amount"`
	Created_At   time.Time `json:"created_at"`
}

func AddCart(cart Cart) error {
	insert, err := db.DB.Query(`INSERT INTO cart (user_id,product_id,total_amount) VALUES (?,?,?)`, cart.User_Id, cart.Product_Id, cart.Total_Amount)
	if err != nil {
		return err
	}

	defer insert.Close()
	return nil
}

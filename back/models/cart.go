package models

import (
	"back/db"
	"database/sql"
	"errors"
	"fmt"
)

type Cart struct {
	Id           int
	User_Id      int
	Product_Id   int     `binding:"required"`
	Quantity     int     `binding:"required"`
	Total_Amount float64 `binding:"required"`
	Created_At   interface{}
}

type FinalCart struct {
	Id           int     `json:"id"`
	Cart_Id      int     `json:"cart_id"`
	Product      Pro     `json:"product"`
	Quantity     int     `binding:"required" json:"quantity"`
	Total_Amount float64 `binding:"required" json:"total_amount"`
}

type Pro struct {
	Id          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Discount    float64 `json:"discount"`
	Image_Url   string  `json:"image_url"`
}

type Cartt struct {
	Id int `json:"cart_id"`
}

type Carttt struct {
	Id           int
	Cart_Id      int
	Product_Id   int     `binding:"required"`
	Quantity     int     `binding:"required"`
	Total_Amount float64 `binding:"required"`
}

func AddCart(cart Cart, user_id int64) error {
	var existingUserID int
	err := db.DB.QueryRow("SELECT id FROM cart WHERE user_id = ?", user_id).Scan(&existingUserID)

	if err == sql.ErrNoRows {
		stmt, err := db.DB.Prepare("INSERT INTO cart (user_id) VALUES (?)")
		if err != nil {
			return err
		}
		defer stmt.Close()

		res, err := stmt.Exec(user_id)
		if err != nil {
			return err
		}

		// Get the ID of the inserted row
		id, err := res.LastInsertId()
		if err != nil {
			return err
		}

		insert, err := db.DB.Query(`INSERT INTO cart_users (cart_id, user_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?, ?)`, id, user_id, cart.Product_Id, cart.Quantity, cart.Total_Amount)

		fmt.Println(err)

		if err != nil {
			return err
		}

		insert.Close()

		return nil

	}

	var id int
	row := db.DB.QueryRow("SELECT id from cart_users where user_id=? and product_id=?", user_id, cart.Product_Id)
	_ = row.Scan(&id)

	if id > 0 {
		return errors.New("can not add new items")
	}

	insert, err := db.DB.Query(`INSERT INTO cart_users (cart_id, user_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?, ?)`, existingUserID, user_id, cart.Product_Id, cart.Quantity, cart.Total_Amount)

	if err != nil {
		return err
	}

	defer insert.Close()
	return nil

}

func GetCart(user_id int64) (Cartt, error) {
	row := db.DB.QueryRow("SELECT id from cart where user_id=?", user_id)

	var cart Cartt
	err := row.Scan(&cart.Id)
	fmt.Println(err)
	if err != nil {
		return Cartt{}, err
	}
	return cart, nil
	// for rows.Next() {
	// 	var cart Cart
	// 	err = rows.Scan(&cart.Id, &cart.User_Id, &cart.Product_Id, &cart.Quantity, &cart.Total_Amount, &cart.Created_At)

	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	carts = append(carts, cart)
	// }
	// return carts, nil

}

func GetAllCart(cart_id int64) ([]FinalCart, error) {
	rows, err := db.DB.Query("SELECT id, cart_id, product_id, quantity, total_amount from cart_users where cart_id=?", cart_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	carts := []Carttt{}
	for rows.Next() {
		var cart Carttt
		err = rows.Scan(&cart.Id, &cart.Cart_Id, &cart.Product_Id, &cart.Quantity, &cart.Total_Amount)

		if err != nil {
			return nil, err
		}

		carts = append(carts, cart)
	}
	fmt.Println(carts)

	var product Pro
	products := []FinalCart{}

	findError := false
	for _, cart := range carts {
		row := db.DB.QueryRow("SELECT id, name, description, price, discount, image_url from products where id=?", cart.Product_Id)
		err = row.Scan(&product.Id, &product.Name, &product.Description, &product.Price, &product.Discount, &product.Image_Url)
		if err != nil {
			findError = true
		}
		// fmt.Println(err)
		e := FinalCart{
			Id:           cart.Id,
			Cart_Id:      cart.Cart_Id,
			Product:      product,
			Quantity:     cart.Quantity,
			Total_Amount: cart.Total_Amount,
		}

		products = append(products, e)
	}
	if findError {
		return nil, errors.New("fuck")
	}

	// fmt.Println(products)

	return products, nil
}

func DeleteCartItem(id int) error {
	// row := db.DB.QueryRow("SELECT id from cart_users where user_id=? and product_id=?", user_id, product_id)

	// var id int
	// err := row.Scan(&id)

	// if err != nil {
	// 	return err
	// }

	_, err := db.DB.Query("DELETE FROM cart_users where id=?", id)
	if err != nil {
		return err
	}

	return nil
}

func CheckUserProductExists(user_id, product_id int64) (int, error) {
	row := db.DB.QueryRow("SELECT id from cart_users where user_id=? and product_id=?", user_id, product_id)

	var id int
	err := row.Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

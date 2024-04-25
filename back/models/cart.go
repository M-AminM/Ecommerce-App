package models

import (
	"back/db"
	"database/sql"
	"errors"
	"fmt"
)

type Cart struct {
	Id           int
	User_Id      int     `binding:"required"`
	Product_Id   int     `binding:"required"`
	Quantity     int     `binding:"required"`
	Total_Amount float64 `binding:"required"`
	Created_At   interface{}
}

type FinalCart struct {
	Id           int
	Cart_Id      int
	Product      Pro
	Quantity     int     `binding:"required"`
	Total_Amount float64 `binding:"required"`
}

type Pro struct {
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

func AddCart(cart Cart) error {
	var existingUserID int
	err := db.DB.QueryRow("SELECT user_id FROM cart WHERE user_id = ?", cart.User_Id).Scan(&existingUserID)
	// fmt.Println(existingUserID)
	fmt.Println(err)
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
		row := db.DB.QueryRow("SELECT name, description, price, discount, image_url from products where id=?", cart.Product_Id)
		err = row.Scan(&product.Name, &product.Description, &product.Price, &product.Discount, &product.Image_Url)
		if err != nil {
			findError = true
		}
		fmt.Println(err)
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

	fmt.Println(products)

	return products, nil
}

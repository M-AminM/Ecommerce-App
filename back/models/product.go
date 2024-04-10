package models

import (
	"back/db"
)

type Product struct {
	ID          int64   `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Discount    float64 `json:"discount"`
	Category_Id int64   `json:"cateory_id"`
	Quantity    int64   `json:"quantity"`
	Image_Url   string  `json:"image_url"`
}

func GetAllProducts() ([]Product, error) {
	rows, err := db.DB.Query("SELECT * FROM products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	products := []Product{}
	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.Discount, &product.Category_Id, &product.Quantity, &product.Image_Url)

		if err != nil {
			return nil, err
		}

		products = append(products, product)
	}
	return products, nil
}

func GetProductByCategoryId(categoryId int64) ([]Product, error) {
	rows, err := db.DB.Query("SELECT * from products where category_id=?", categoryId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	products := []Product{}
	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.Discount, &product.Category_Id, &product.Quantity, &product.Image_Url)

		if err != nil {
			return nil, err
		}

		products = append(products, product)
	}
	return products, nil
}

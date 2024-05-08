export interface CartInterface {
  cart: number;
  id: number;
  product: product;
  quantity: number;
  total_amount: number;
}

type product = {
  name: string;
  description: string;
  price: number;
  discount: number;
  image_url: string;
};

export interface CartPostInterface {
  product_id: number;
  quantity: number;
  total_amount: number;
}

export interface CartResInterface {
  Id: number;
  User_Id: number;
  Product_Id: number;
  Quantity: number;
  Total_Amount: number;
  Created_At: string;
}

export interface CartUpdateInterface {
  quantity: number;
  product_id: number;
}

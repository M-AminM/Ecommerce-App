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

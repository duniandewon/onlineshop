export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  discount?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

import axios from 'axios';
import { CartItem } from '../interfaces';

class cartServices {
  getCarts = async (): Promise<CartItem[]> => {
    const res = await axios.get('http://localhost:3000/api/carts');

    if (res.status !== 200) throw new Error('Fetching Error');

    return res.data;
  };

  addToCart = async (productId: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      'http://localhost:3000/api/carts',
      { productId },
      config
    );

    if (res.status !== 200) throw new Error('Faild add to cart');

    return res.data;
  };

  toggleQuantity = async (productId: string, action: string) => {};

  removeFromCart = async (productId: string) => {};
}

export default cartServices;

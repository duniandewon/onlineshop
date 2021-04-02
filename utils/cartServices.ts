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

  toggleQuantity = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `http://localhost:3000/api/carts/${productId}`,
      { quantity },
      config
    );

    return res.data;
  };

  removeFromCart = async (productId: string) => {
    const res = await axios.delete(
      `http://localhost:3000/api/carts/${productId}`
    );

    if (res.status !== 200) throw new Error('Faild remove from cart');

    return res.data;
  };
}

export default cartServices;

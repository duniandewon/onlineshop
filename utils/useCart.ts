import { useEffect, useState } from 'react';
import { CartItem } from '../interfaces';

import axios from 'axios';

const useCart = (productId: string, price: number) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [error, setError] = useState();

  const addToCart = async () => {
    setCartItem({ quantity: 1, price, productId });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'http://localhost:3000/api/carts',
        { productId },
        config
      );
      setCartItem(res.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    }
  };

  const toggleQuantity = async (productId: string, action: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (action === 'dec' && cartItem.quantity > 1)
      setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });

    if (action === 'inc')
      setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });

    try {
      const res = await axios.put(
        `http://localhost:3000/api/carts/${productId}`,
        { action },
        config
      );
      setCartItem(res.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (productId === cartItem.productId) setCartItem(null);

    try {
      await axios.delete(`http://localhost:3000/api/carts/${productId}`);
      setCartItem(null);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    }
  };

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/carts/${productId}`
        );
        if (res.status === 200) {
          setCartItem(res.data);
        }
      } catch (err) {
        setError(err.response.data.msg);
      }
    };
    getCartItem();
  }, []);

  return { addToCart, toggleQuantity, removeFromCart, cartItem, error };
};

export default useCart;

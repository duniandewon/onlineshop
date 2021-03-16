import axios from 'axios';
import { CartItem } from '../../interfaces';

import {
  GET_CARTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_QUANTITY,
  CartActionTypes,
} from '../types';

export const getCarts = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/carts`);
    dispatch(getCartAction(res.data));
  } catch (err) {
    console.log(err.response);
  }
};

export const addToCart = (productId: string, price: number) => async (
  dispatch
) => {
  const cartItem: CartItem = { productId, price, quantity: 1 };
  dispatch(addToCartAction(cartItem));
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('http://localhost:3000/api/carts', { productId }, config);
    dispatch(getCarts());
  } catch (err) {
    console.log(err.response);
  }
};

function getCartAction(payload: CartItem[]): CartActionTypes {
  return {
    type: GET_CARTS,
    payload,
  };
}

function addToCartAction(payload: CartItem): CartActionTypes {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

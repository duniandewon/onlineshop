import { CartItem } from '../../interfaces';
import {
  GET_CARTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_QUANTITY,
  CartActionTypes,
} from '../types';

const INTIAL_STATE: CartItem[] = [];

const productsReducer = (state = INTIAL_STATE, action: CartActionTypes) => {
  switch (action.type) {
    case GET_CARTS:
      return action.payload;

    case ADD_TO_CART:
      return [...state, action.payload];

    case TOGGLE_QUANTITY:
      const { productId, action: incOrDec } = action.payload;
      console.log(incOrDec);
      return state.map((cartItem) => {
        if (cartItem.productId === productId) {
          if (incOrDec === 'inc') {
            return { ...cartItem, quantity: (cartItem.quantity += 1) };
          }

          if (incOrDec === 'dec' && cartItem.quantity > 1) {
            return { ...cartItem, quantity: (cartItem.quantity -= 1) };
          }
        }

        return cartItem;
      });

    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem.productId !== action.payload);

    default:
      return state;
  }
};

export default productsReducer;

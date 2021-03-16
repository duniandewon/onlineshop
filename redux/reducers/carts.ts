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

    default:
      return state;
  }
};

export default productsReducer;

import { Product } from '../../interfaces';
import { GET_PRODUCTS, ProductsActionTypes } from '../types';

const INTIAL_STATE: Product[] = [];

const productsReducer = (state = INTIAL_STATE, action: ProductsActionTypes) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
};

export default productsReducer;

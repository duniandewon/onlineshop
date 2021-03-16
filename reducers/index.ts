import { combineReducers } from 'redux';
import products from '../redux/reducers/products';
import carts from '../redux/reducers/carts';

import { CartItem, Product } from '../interfaces';

export interface RootState {
  products: Product[];
  carts: CartItem[];
}

export default combineReducers({ products, carts });

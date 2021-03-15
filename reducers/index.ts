import { combineReducers } from 'redux';
import products from '../redux/reducers/products';
import { Product } from '../interfaces';

export interface RootState {
  products: Product[];
}

export default combineReducers({ products });

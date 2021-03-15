import axios from 'axios';
import { Dispatch } from 'redux';
import { Product } from '../../interfaces';

import { GET_PRODUCTS, ProductsActionTypes } from '../types';

export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('http://localhost:3000/api/products');
    dispatch(getProductsAction(res.data));
  } catch (err) {
    console.log(err.response);
  }
};

function getProductsAction(payload: Product[]): ProductsActionTypes {
  return {
    type: GET_PRODUCTS,
    payload,
  };
}

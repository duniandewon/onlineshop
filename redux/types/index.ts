import { Product } from '../../interfaces';

export const GET_PRODUCTS = 'GET_PRODUCTS';

interface GetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: Product[];
}

export type ProductsActionTypes = GetProductsAction;

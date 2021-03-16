import { CartItem, Product } from '../../interfaces';

/** Products action types */
export const GET_PRODUCTS = 'GET_PRODUCTS';

interface GetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: Product[];
}

export type ProductsActionTypes = GetProductsAction;

/** Carts action types */
export const GET_CARTS = 'GET_CARTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const TOGGLE_QUANTITY = 'TOGGLE_QUANTITY';

interface GetCartsAction {
  type: typeof GET_CARTS;
  payload: CartItem[];
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
}

interface ToggleQuantityAction {
  type: typeof TOGGLE_QUANTITY;
  payload: CartItem;
}

export type CartActionTypes =
  | GetCartsAction
  | AddToCartAction
  | RemoveFromCartAction
  | ToggleQuantityAction;

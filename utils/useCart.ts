import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../interfaces';

import {
  addToCart as addToCartAction,
  toggleQuantity as toggleQuantityAction,
  removeFromCart as removeFromCartAction,
} from '../redux/actions/carts';

import { RootState } from '../reducers';

const useCart = (productId: string, price: number) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const dispatch = useDispatch();
  const carts: CartItem[] = useSelector(({ carts }: RootState) => carts);

  const addToCart = () => {
    setCartItem({ quantity: 1, productId, price });

    dispatch(addToCartAction(productId, price));
  };

  const toggleQuantity = async (action: string) => {
    if (action === 'dec' && cartItem.quantity === 1) {
      dispatch(removeFromCartAction(productId));
    }

    if (action === 'dec' && cartItem.quantity > 1) {
      dispatch(toggleQuantityAction(productId, 'dec'));
    }

    if (action === 'inc') {
      dispatch(toggleQuantityAction(productId, 'inc'));
    }
  };

  useEffect(() => {
    const cartItem: CartItem = carts.find(
      (cart) => cart.productId === productId
    );

    setCartItem(cartItem);
  }, [carts]);

  return { addToCart, toggleQuantity, cartItem };
};

export default useCart;

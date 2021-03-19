import { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import cartServices from '../utils/cartServices';

import { CartItem } from '../interfaces';

import * as actions from '../redux/actions/carts';

const CartServices = new cartServices();

const useCart = (productId: string, price: number) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const carts: CartItem[] = queryClient.getQueryData('carts');

  const addToCartMutation = useMutation(CartServices.addToCart, {
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries('carts');

      const prevCarts = queryClient.getQueryData<CartItem[]>('carts');

      if (prevCarts) {
        queryClient.setQueryData<CartItem[]>('carts', (old) => [
          ...old,
          { quantity: 1, productId, price },
        ]);
      }

      return prevCarts;
    },

    onError: (err, newTodo, prevCarts) => {
      if (prevCarts) {
        queryClient.setQueryData<CartItem[]>('caerts', prevCarts);
      }
    },
  });

  const addToCart = () => {
    addToCartMutation.mutate(productId);
  };

  const toggleQuantity = async (action: string) => {
    if (action === 'dec' && cartItem.quantity === 1) {
      dispatch(actions.removeFromCart(productId));
    }

    if (action === 'dec' && cartItem.quantity > 1) {
      dispatch(actions.toggleQuantity(productId, 'dec'));
    }

    if (action === 'inc') {
      dispatch(actions.toggleQuantity(productId, 'inc'));
    }
  };

  useEffect(() => {
    const cartItem: CartItem =
      carts && carts?.find((cart) => cart.productId === productId);

    setCartItem(cartItem);
  }, [carts]);

  return { addToCart, toggleQuantity, cartItem };
};

export default useCart;

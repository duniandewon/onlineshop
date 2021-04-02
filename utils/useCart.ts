import { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';

import cartServices from '../utils/cartServices';

import { CartItem } from '../interfaces';

const CartServices = new cartServices();

const useCart = (productId: string, price: number) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

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
        queryClient.setQueryData<CartItem[]>('carts', prevCarts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('carts');
    },
  });

  const toggleQuantityMutation = useMutation(CartServices.toggleQuantity, {
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries('carts');

      const prevCarts = queryClient.getQueryData<CartItem[]>('carts');

      if (prevCarts) {
        queryClient.setQueryData<CartItem[]>('carts', (old) =>
          old.map((cartItem) => {
            if (cartItem.productId === productId) {
              return { ...cartItem, quantity };
            }

            return cartItem;
          })
        );
      }

      return prevCarts;
    },
    onError: (err, newTodo, prevCarts) => {
      console.log('Error when toggling quantity: ', prevCarts);
      // if (prevCarts) {
      //   queryClient.setQueryData<CartItem[]>('carts', prevCarts);
      // }
    },
    onSettled: () => {
      queryClient.invalidateQueries('carts');
    },
  });

  const removeFromCartMutation = useMutation(CartServices.removeFromCart, {
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries('carts');

      const prevCarts = queryClient.getQueryData<CartItem[]>('carts');

      if (prevCarts) {
        queryClient.setQueryData<CartItem[]>('carts', (old) =>
          old.filter((item) => item.productId !== productId)
        );
      }

      return prevCarts;
    },
    onError: (err, newTodo, prevCarts) => {
      if (prevCarts) {
        queryClient.setQueryData<CartItem[]>('carts', prevCarts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('carts');
    },
  });

  const addToCart = () => {
    addToCartMutation.mutate(productId);
  };

  const toggleQuantity = async (action: string) => {
    let quantity = cartItem.quantity;

    if (action === 'dec') {
      cartItem.quantity === 1
        ? removeFromCartMutation.mutate(productId)
        : (quantity -= 1);
    }

    if (action === 'inc') {
      quantity += 1;
    }

    toggleQuantityMutation.mutate({ productId, quantity });
  };

  const removeFromCart = () => {
    removeFromCartMutation.mutate(productId);
  };

  useEffect(() => {
    const cartItem: CartItem =
      carts && carts?.find((cart) => cart.productId === productId);

    setCartItem(cartItem);
  }, [carts]);

  return { addToCart, toggleQuantity, removeFromCart, cartItem };
};

export default useCart;

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
    onMutate: async ({ productId, action }) => {
      await queryClient.cancelQueries('carts');

      const prevCarts = queryClient.getQueryData<CartItem[]>('carts');

      if (prevCarts) {
        queryClient.setQueryData<CartItem[]>('carts', (old) =>
          old.map((cartItem) => {
            if (cartItem.productId === productId) {
              if (action === 'inc') {
                return { ...cartItem, quantity: (cartItem.quantity += 1) };
              }

              if (action === 'dec' && cartItem.quantity > 1) {
                return { ...cartItem, quantity: (cartItem.quantity -= 1) };
              }
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
    if (action === 'dec' && cartItem.quantity === 1) {
      removeFromCartMutation.mutate(productId);
    }

    if (action === 'dec' && cartItem.quantity > 1) {
      toggleQuantityMutation.mutate({ productId, action: 'dec' });
    }

    if (action === 'inc') {
      toggleQuantityMutation.mutate({ productId, action: 'inc' });
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

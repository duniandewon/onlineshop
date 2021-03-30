import { useQueryClient } from 'react-query';

import useCart from '../../../utils/useCart';

import ToggleAmount from '../../products/ToggleAmount';

import { CartItem as CartItem_I, Product } from '../../../interfaces';
import { useEffect, useState } from 'react';

interface Prop {
  cartItem: CartItem_I;
}

const CartItem = ({ cartItem }: Prop) => {
  const [product, setProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const products: Product[] = queryClient.getQueryData('posts');

  const { toggleQuantity, removeFromCart } = useCart(
    cartItem.productId,
    cartItem.price
  );

  useEffect(() => {
    if (products) {
      const product = products.find(
        (product) => product._id === cartItem.productId
      );

      setProduct(product);
    }
  }, []);

  return (
    product && (
      <div className="cart">
        <ToggleAmount
          toggleQuantity={toggleQuantity}
          quantity={cartItem.quantity}
          direction="vertical"
        />
        <div className="cart__image">
          <img src={product?.image} alt={product.title} />
        </div>
        <p className="cart__name">{product.title}</p>
        <p className="cart__price">${product.price}</p>
        <button className="x-btn" onClick={removeFromCart}>
          X
        </button>
      </div>
    )
  );
};

export default CartItem;

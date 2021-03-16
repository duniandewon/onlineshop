import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ToggleAmount from '../ToggleAmount';

import { CartItem, Product as Product_I } from '../../../interfaces';
import { RootState } from '../../../reducers';

import {
  addToCart,
  toggleQuantity,
  removeFromCart,
} from '../../../redux/actions/carts';

interface Prop {
  product: Product_I;
}

const Product = ({ product }: Prop) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const dispatch = useDispatch();
  const carts: CartItem[] = useSelector(({ carts }: RootState) => carts);

  const handleAddToCArt = () => {
    const { _id, price } = product;

    setCartItem({ quantity: 1, productId: _id, price });

    dispatch(addToCart(product._id, product.price));
  };

  const handleToggleQuantity = (action: string) => {
    if (action === 'dec' && cartItem.quantity === 1) {
      dispatch(removeFromCart(product._id));
    }

    if (action === 'dec' && cartItem.quantity > 1) {
      dispatch(toggleQuantity(product._id, 'dec'));
    }

    if (action === 'inc') {
      dispatch(toggleQuantity(product._id, 'inc'));
    }
  };

  useEffect(() => {
    const cartItem: CartItem = carts.find(
      (cart) => cart.productId === product._id
    );

    setCartItem(cartItem);
  }, [carts]);

  return (
    <div className="product">
      <div className="product__image-container">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product__body">
        <h3 className="product__name">{product.title}</h3>
        <div className="product__info">
          <div className="product__price">
            {product.discount && (
              <div className="product__price--original">{product.price}</div>
            )}
            <div className="product__price--dicount">
              {product.discount
                ? product.price - (product.price * product.discount) / 100
                : product.price}
            </div>
          </div>
          <ToggleAmount
            addToCart={handleAddToCArt}
            toggleQuantity={handleToggleQuantity}
            quantity={cartItem && cartItem.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;

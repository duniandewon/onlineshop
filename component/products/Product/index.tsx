import ToggleAmount from '../ToggleAmount';

import { Product as Product_I } from '../../../interfaces';

import useCart from '../../../utils/useCart';

interface Prop {
  product: Product_I;
}

const Product = ({ product }: Prop) => {
  const { addToCart, toggleQuantity, removeFromCart, cartItem } = useCart(
    product._id,
    product.price
  );

  const handleTogleQuantity = (action: string) => {
    if (action === 'dec' && cartItem.quantity > 1)
      toggleQuantity(product._id, 'dec');

    if (action === 'dec' && cartItem.quantity === 1)
      removeFromCart(product._id);

    if (action === 'inc') toggleQuantity(product._id, 'inc');
  };

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
            addToCart={addToCart}
            toggleQuantity={handleTogleQuantity}
            quantity={cartItem && cartItem.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;

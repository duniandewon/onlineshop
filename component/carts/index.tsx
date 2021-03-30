import Link from 'next/link';
import { useQueryClient } from 'react-query';

import { CartItem as CartItem_I } from '../../interfaces';
import CartItem from './CartItem';

interface Props {
  isOpen: Boolean;
  closeCart: () => void;
}

const Carts = ({ isOpen, closeCart }: Props) => {
  const queryClient = useQueryClient();

  const carts: CartItem_I[] = queryClient.getQueryData('carts');

  const handleRenderEmptyCart = () => {
    return <h1>No products found</h1>;
  };

  const handleRenderCarts = () => {
    return (
      carts &&
      carts.map((cart) => <CartItem key={cart.productId} cartItem={cart} />)
    );
  };

  const total =
    carts &&
    carts.reduce(
      (prevValue, currValue) =>
        prevValue + currValue.price * currValue.quantity,
      0
    );

  return (
    <div className={`carts ${isOpen ? 'open' : ''}`}>
      <div className="carts__header">
        <span>
          <i className="fas fa-shopping-cart"></i> {carts.length} items
        </span>
        <button className="x-btn" onClick={closeCart}>
          X
        </button>
      </div>
      <div className="carts__body">
        {carts.length === 0 ? handleRenderEmptyCart() : handleRenderCarts()}
      </div>
      <div className="carts__footer">
        <div className="carts__voucher">Do you have a voucher?</div>
        <div className="carts__checkout">
          <Link href="/checkout">
            <a className="btn checkout-btn">
              <span>checkout</span>
              <span className="checkout-btn--subtotal">${total}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carts;

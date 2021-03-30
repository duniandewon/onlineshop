import { CartItem } from '../../../interfaces';

interface Props {
  carts: CartItem[];
  openCart: () => void;
}

const CartToggler = ({ carts, openCart }: Props) => {
  const total =
    carts &&
    carts.reduce(
      (prevValue, currValue) =>
        prevValue + currValue.price * currValue.quantity,
      0
    );

  return (
    <div className="cart-toggler" onClick={openCart}>
      <div className="cart-toggler__items">
        <i className="fas fa-shopping-basket" /> {carts && carts.length} items
      </div>
      <div className="cart-toggler__total">${total}</div>
    </div>
  );
};

export default CartToggler;

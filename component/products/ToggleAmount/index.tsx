import { Fragment } from 'react';

interface Props {
  quantity: number;
  addToCart?: () => void;
  toggleQuantity: (action: string) => void;
  direction?: string;
}

const ToggleAmount = ({
  quantity,
  addToCart,
  toggleQuantity,
  direction,
}: Props) => {
  return (
    <Fragment>
      {quantity >= 1 ? (
        <div
          className={`toggle-quantity ${
            direction === 'vertical' ? 'vertical' : ''
          }`}
        >
          <button className="inc-prod" onClick={() => toggleQuantity('inc')}>
            <i className="fas fa-plus"></i>
          </button>
          <span>{quantity}</span>
          <button className="dec-prod" onClick={() => toggleQuantity('dec')}>
            <i className="fas fa-minus"></i>
          </button>
        </div>
      ) : (
        <button className="add-to-cart" onClick={addToCart}>
          Add To Cart
        </button>
      )}
    </Fragment>
  );
};

export default ToggleAmount;

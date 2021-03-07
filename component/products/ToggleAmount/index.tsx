import { Fragment } from 'react';

interface Props {
  quantity: number;
}

const ToggleAmount = ({ quantity }: Props) => {
  return (
    <Fragment>
      {quantity >= 1 ? (
        <div className="toggle-quantity">
          <button>
            <i className="fas fa-plus"></i>
          </button>
          <span>{quantity}</span>
          <button>
            <i className="fas fa-minus"></i>
          </button>
        </div>
      ) : (
        <button className="add-to-cart">Add To Cart</button>
      )}
    </Fragment>
  );
};

export default ToggleAmount;

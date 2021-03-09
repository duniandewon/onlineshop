import React from 'react';
import Modal, { Modal_I } from '../../layout/Modal';

import ToggleAmount from '../ToggleAmount';

import { Product } from '../../../interfaces';

type Prop = Modal_I & { product: Product };

const ProductDetail = ({ isOpen, onClose, product }: Prop) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {product && (
        <div className="product-detail">
          <div className="product-detail__image-container">
            <div className="product-detail__image">
              <img src={product.image} alt={product.title} />
            </div>
          </div>
          <div className="product-detail__body">
            <h3 className="product-detail__title">{product.title}</h3>
            <p className="product-detail__description">{product.description}</p>
            <div className="product-detail__categories">
              {product.category.split(' ').map((category) => (
                <div key={category} className="product-detail__category">
                  {category}
                </div>
              ))}
            </div>
            <div className="product-detail__footer">
              <span className="product-detail__price">${product.price}</span>
              <ToggleAmount quantity={0} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProductDetail;

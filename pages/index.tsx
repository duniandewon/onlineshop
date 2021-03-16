import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainHome from '../component/layout/MainHome';
import Product from '../component/products/Product';
import ProductDetail from '../component/products/ProductDetail';

import { getProducts } from '../redux/actions/products';
import { getCarts } from '../redux/actions/carts';

import { Product as Product_I } from '../interfaces';
import { RootState } from '../reducers';

const Home = () => {
  const [product, setProduct] = useState<Product_I | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector(({ products }: RootState) => products);

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  type ClickEvent = React.MouseEvent<HTMLDivElement>;

  const handleSetProduct = (product: Product_I) => {
    handleToggleModal();
    setProduct(product);
  };

  const handleOnClickProduct = (e: ClickEvent, product: Product_I) => {
    const target = e.target as Element;

    const invalidClicks =
      target.className !== 'add-to-cart' &&
      target.className !== 'fas fa-plus' &&
      target.className !== 'fas fa-minus';

    if (invalidClicks) {
      handleSetProduct(product);
    }
  };

  const handleRenderProducts = () =>
    products &&
    products.length > 0 && (
      <div className="products">
        {products.map((product) => (
          <div
            className="product_wrapper"
            onClick={(e: ClickEvent) => handleOnClickProduct(e, product)}
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    );

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
    setProduct(null);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCarts());
  }, []);

  return (
    <Fragment>
      <MainHome titile="Home">{handleRenderProducts()}</MainHome>
      {product && isModalOpen && (
        <ProductDetail
          product={product}
          isOpen={isModalOpen}
          onClose={handleOnCloseModal}
        />
      )}
    </Fragment>
  );
};

export default Home;

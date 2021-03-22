import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-query';

import MainHome from '../component/layout/MainHome';
import Product from '../component/products/Product';
import ProductDetail from '../component/products/ProductDetail';

import cartServices from '../utils/cartServices';

import { Product as Product_I } from '../interfaces';
import useProducts from '../utils/useProducts';

const CartServices = new cartServices();

const Home = () => {
  const [product, setProduct] = useState<Product_I | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useProducts();

  useQuery('carts', CartServices.getCarts);

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
    !isLoading && (
      <div className="products">
        {data.map((product: Product_I) => (
          <div
            key={product._id}
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

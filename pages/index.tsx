import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import MainHome from '../component/layout/MainHome';
import Product from '../component/products/Product';
import ProductDetail from '../component/products/ProductDetail';

import { Product as Product_I } from '../interfaces';

const Home = () => {
  const [products, setProducts] = useState<Product_I[]>([]);
  const [product, setProduct] = useState<Product_I>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSetProduct = (product: Product_I) => {
    handleToggleModal();
    setProduct(product);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('http://localhost:3000/api/products');

      if (res.data) {
        setProducts(res.data);
      }
    };

    getProducts();
  }, []);
  return (
    <Fragment>
      {product && isModalOpen && (
        <ProductDetail
          product={product}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <MainHome titile="Home">
        {products && products.length > 0 && (
          <div className="products">
            {products.map((product) => (
              <div
                className="product_wrapper"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  const target = e.target as Element;
                  if (target.className !== 'add-to-cart') {
                    handleSetProduct(product);
                  }
                }}
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </MainHome>
    </Fragment>
  );
};

export default Home;

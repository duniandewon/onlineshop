import axios from 'axios';
import { useEffect, useState } from 'react';

import MainHome from '../component/layout/MainHome';
import Product from '../component/products/Product';

import { Product as Product_I } from '../interfaces';

const Home = () => {
  const [products, setProducts] = useState<Product_I[]>([]);

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
    <MainHome titile="Home">
      {products && products.length > 0 && (
        <div className="products">
          {products.map((product) => (
            <div className="product_wrapper">
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </MainHome>
  );
};

export default Home;

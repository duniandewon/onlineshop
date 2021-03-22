import axios from 'axios';
import { useQuery } from 'react-query';

import { Product as Product_I } from '../interfaces';

const useProducts = () => {
  const getProducts = async (): Promise<Product_I[]> => {
    const res = await axios.get('http://localhost:3000/api/products');

    if (res.status !== 200) throw new Error('Fetching Error');

    return res.data;
  };

  return useQuery('posts', getProducts);
};

export default useProducts;

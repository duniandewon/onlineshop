import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';

import connectDB from '../../../utils/connectDB';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.find({});

        if (!product) {
          return res.status(404).json({ msg: 'No products were found!' });
        }

        return res.status(200).json(product);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
      }

    default:
      return res.status(500).json({ msg: 'Something went wrong.' });
  }
};

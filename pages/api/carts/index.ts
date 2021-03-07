import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';
import Cart from '../../../models/Cart';

import connectDB from '../../../utils/connectDB';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { productId },
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const cart = await Cart.find({});

        if (!cart) {
          return res.status(404).json({ msg: 'No products were found!' });
        }

        return res.status(200).json(cart);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
      }

    case 'POST':
      try {
        const product = await Product.findById(productId);

        const newCart = new Cart({
          quantity: 1,
          price: product.price,
          productId,
        });

        const cart = await newCart.save();

        return res.status(200).json(cart);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
      }

    default:
      return res.status(500).json({ msg: 'Something went wrong.' });
  }
};

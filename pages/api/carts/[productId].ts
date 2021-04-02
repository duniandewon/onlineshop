import type { NextApiRequest, NextApiResponse } from 'next';
import Cart from '../../../models/Cart';

import connectDB from '../../../utils/connectDB';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { productId },
    body: { quantity },
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const cartItem = await Cart.findOne({ productId });

        if (!cartItem) {
          return res.status(404).json({ msg: 'Product not found.' });
        }

        return res.status(200).json(cartItem);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
      }

    case 'PUT':
      try {
        const cartItem = await Cart.findOne({ productId });

        if (!cartItem) {
          return res.status(404).json({ msg: 'Product not found.' });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        return res.status(200).json(cartItem);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
      }

    case 'DELETE':
      try {
        const cartItem = await Cart.findOne({ productId });

        if (!cartItem) {
          return res.status(404).json({ msg: 'Product not found.' });
        }

        await Cart.findOneAndRemove({ productId });

        return res.status(200).json({ msg: 'Prodyct removed from cart!' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong.' });
      }

    default:
      return res.status(500).json({ msg: 'Something went wrong.' });
  }
};

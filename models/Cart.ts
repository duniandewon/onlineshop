import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

export default mongoose.models.Cart || mongoose.model('cart', CartSchema);

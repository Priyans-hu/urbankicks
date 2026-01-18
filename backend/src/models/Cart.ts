import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICartItem {
  _id?: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  price: number;
  toObject?: () => Record<string, unknown>;
}

export interface ICart extends Document {
  _id: Types.ObjectId;
  user: string;
  items: ICartItem[];
  total: number;
}

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Fixed: was 'products', should be 'Product'
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const CartSchema = new Schema<ICart>({
  user: {
    type: String,
    required: true
  },
  items: [CartItemSchema],
  total: {
    type: Number,
    default: 0
  }
});

export const Cart = mongoose.model<ICart>('Cart', CartSchema);

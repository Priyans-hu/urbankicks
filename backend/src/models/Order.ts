import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrderProduct {
  product_id: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  products: IOrderProduct[];
  total_amount: number;
  order_date: Date;
  order_status: string;
}

const OrderSchema = new Schema<IOrder>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: { type: Number, required: true }
  }],
  total_amount: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  order_status: { type: String, default: 'Pending' }
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);

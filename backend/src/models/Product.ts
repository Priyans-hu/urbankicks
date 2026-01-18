import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProductAttributes {
  color?: string;
  sizes?: string[];
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  quantity: number;
  productImg?: string;
  attributes: IProductAttributes;
  price: number;
  categories: string[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  productImg: { type: String },
  attributes: {
    color: { type: String },
    sizes: [{ type: String }]
  },
  price: { type: Number, required: true },
  categories: [{ type: String }]
}, { collection: 'Products' });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);

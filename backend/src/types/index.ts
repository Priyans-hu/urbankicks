import { Request } from 'express';
import { Document, Types } from 'mongoose';

// User types
export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  address?: IAddress;
  created_at: Date;
  updated_at: Date;
}

export interface IUserResponse {
  id: Types.ObjectId;
  username: string;
  email: string;
  phone_number?: string;
  address?: IAddress;
}

// Product types
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categories: string[];
  image?: string;
}

// Cart types
export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  _id: Types.ObjectId;
  user: string;
  items: ICartItem[];
  total: number;
}

// Order types
export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: Date;
}

// Review types
export interface IReview extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  reviewHead: string;
  reviewText: string;
  createdAt: Date;
}

// Request with user
export interface AuthRequest extends Request {
  userId?: string;
}

// Cookie options
export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

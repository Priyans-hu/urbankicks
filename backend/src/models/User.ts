import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  phone_number: string;
  address: IAddress;
  order_history: Array<{ order_id: Types.ObjectId }>;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone_number: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true }
  },
  order_history: [{
    order_id: { type: Schema.Types.ObjectId, ref: 'Order' }
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Update timestamp on save
UserSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export const User = mongoose.model<IUser>('User', UserSchema);

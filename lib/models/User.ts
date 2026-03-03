import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserProfile {
  fullName?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zip?: string;
  role?: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  profile?: IUserProfile;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    profile: {
      fullName: { type: String },
      phone: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
      address: { type: String },
      zip: { type: String },
      role: { type: String },
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;

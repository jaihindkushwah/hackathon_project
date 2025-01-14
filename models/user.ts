// import {Model} from 'mongodb'
import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<IUser & Document>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});
export const UserModel =
  mongoose.models.User || mongoose.model<IUser & Document>("User", userSchema);

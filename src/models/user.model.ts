import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/user.interface";

const UserSchema: Schema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    otp: {
      type: String,
    },
    otpSentCount: {
      type: Number,
      default: 0,
    },
    otpExpiry: {
      type: Date,
    },
    googleId: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    lastOtpSentAt: {
        type: Date,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
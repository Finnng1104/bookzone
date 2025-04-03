export interface IUser extends Document {
    fullname: string;
    email?: string;
    password?: string;
    otp?: string;
    otpSentCount?: number;
    otpExpiry?: Date;
    googleId?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastOtpSentAt?: Date;
  }
  
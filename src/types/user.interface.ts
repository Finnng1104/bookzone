export interface IUser extends Document {
  fullname: string;
  email?: string;
  password?: string;
  otp?: string;
  otpSentCount?: number;
  otpExpiry?: Date;
  googleId?: string;
  avatar?: string;
  lastOtpSentAt?: Date;
  role: "user" | "admin"; 
}

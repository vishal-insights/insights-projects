import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String },
  resetOTP: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// 👇 FORCE NEW MODEL (IMPORTANT FOR DEBUGGING)
const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema, "sk_dwivedi_associates_clients");

export default User;
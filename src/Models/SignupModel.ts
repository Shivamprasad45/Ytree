import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, default: "user" },
  image: { type: String },
  authProviderId: { type: String },
  // Referral system fields
  referralCode: {
    type: String,
    unique: true,
    index: true,
  },
  referredBy: {
    type: String,
    index: true,
  },
  referredUsers: {
    type: Number,
    default: 0,
  },
});

// Add index for common query fields
userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

import mongoose, { Document, Model, Schema } from "mongoose";

interface IReferralTemp extends Document {
  email: string;
  referralCode?: string;
  role: string;
  createdAt: Date;
}

const ReferralTempSchema = new Schema<IReferralTemp>({
  email: {
    type: String,
    required: true,
    index: true,
  },
  referralCode: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Expires after 10 minutes
  },
});

export const ReferralTemp: Model<IReferralTemp> =
  mongoose.models.ReferralTemp ||
  mongoose.model<IReferralTemp>("ReferralTemp", ReferralTempSchema);

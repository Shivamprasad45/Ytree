import mongoose, { Schema } from "mongoose";

export const cartSchema = new Schema({
  UserId: {
    type: String,
    required: true,
  },

  Trees: { type: Number, required: true, default: 0 },
  district: { type: String, required: true },
  state: { type: String, required: true },
});

// Check if the model already exists to prevent overwriting
const Leader =
  mongoose.models.LeaderBoard || mongoose.model("LeaderBoard", cartSchema);

export default Leader;

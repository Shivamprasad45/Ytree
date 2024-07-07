import mongoose, { Schema } from "mongoose";

export const cartSchema = new Schema({
  UserId: {
    type: String,
    required: true,
  },
  Plant_id: { type: String, required: true },
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  description: { type: String, required: true },
  growthRequirements: { type: String, required: true },
  benefits: { type: [String], required: true },
  region: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Check if the model already exists to prevent overwriting
const cart = mongoose.models.Treecart || mongoose.model("Treecart", cartSchema);

export default cart;

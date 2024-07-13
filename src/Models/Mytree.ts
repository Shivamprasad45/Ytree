import mongoose, { Schema } from "mongoose";

export const MytreeSchema = new Schema({
  Plaintid: {
    type: String,
    required: true,
  },
  findtree_id: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

// Check if the model already exists to prevent overwriting
const Mytree = mongoose.models.Mytree || mongoose.model("Mytree", MytreeSchema);

export default Mytree;

import mongoose, { Schema } from "mongoose";
import { string } from "zod";

const MytreeSchema = new Schema({
  Plaintid: {
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
    type: String,
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

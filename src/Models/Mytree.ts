import mongoose, { Schema } from "mongoose";

const MytreeSchema = new Schema({
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
});

// Check if the model already exists to prevent overwriting
const Mytree = mongoose.models.Mytree || mongoose.model("Mytree", MytreeSchema);

export default Mytree;

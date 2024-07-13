import mongoose, { Schema } from "mongoose";

const Plants_coordinate_Schema = new Schema({
  find_id: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  Plant_id: { type: String, required: true },
  commonName: { type: String, required: true },
  late: { type: Number, required: true },
  long: { type: Number, required: true },
  imageURL: { type: String, required: true },
  Plant_Addresses: { type: String, required: true },
});

// Check if the model already exists to prevent overwriting
const Plants_coordinates =
  mongoose.models.Plants_coordinate ||
  mongoose.model("Plants_coordinate", Plants_coordinate_Schema);

export default Plants_coordinates;

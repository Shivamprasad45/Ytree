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
  subscription: {
    endpoint: String,
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  lastWeatherState: { type: Array },
});

// Check if the model already exists to prevent overwriting
const Plants_coordinates =
  mongoose.models.plants_coordinates ||
  mongoose.model("plants_coordinates", Plants_coordinate_Schema);

export default Plants_coordinates;

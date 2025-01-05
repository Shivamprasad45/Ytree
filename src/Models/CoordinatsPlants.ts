import mongoose, { Schema } from "mongoose";

const Plants_coordinate_Schema = new Schema({
  find_id: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: false, // Made optional
  },
  Plant_id: {
    type: String,
    required: false, // Made optional
  },
  commonName: {
    type: String,
    required: false, // Made optional
  },
  late: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  Plant_Addresses: {
    type: String,
    required: true,
  },
  subscription: {
    type: {
      endpoint: { type: String },
      keys: {
        p256dh: { type: String },
        auth: { type: String },
      },
    },
    required: false, // Made optional
  },
  description: {
    type: String,
    required: false, // Added
  },
  bio: {
    type: String,
    required: false, // Added
  },
  name: {
    type: String,
    required: false, // Added
  },
  relation: {
    type: String,
    required: false, // Added
  },
  lastWeatherState: {
    type: [String],
    required: false, // Preserved
  },
  verifed: {
    default: false,
    type: Boolean,
    required: false, // Added
  },
});

// Check if the model already exists to prevent overwriting
const Plants_coordinates =
  mongoose.models.plants_coordinates ||
  mongoose.model("plants_coordinates", Plants_coordinate_Schema);

export default Plants_coordinates;

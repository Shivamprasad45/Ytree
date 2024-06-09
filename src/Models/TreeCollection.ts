import mongoose from "mongoose";

const treeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  description: { type: String, required: true },
  growthRequirements: { type: String, required: true },
  benefits: { type: [String], required: true },
  region: { type: String, required: true },
  imageURL: { type: String, required: true },
  prise: { type: Number },
});

const Tree = mongoose.models.Tree || mongoose.model("Tree", treeSchema);

export default Tree;

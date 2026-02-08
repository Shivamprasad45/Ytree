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
  sideImages: { type: [String], required: false, default: [] }, // Additional images for gallery
  stock: { type: Number, default: 0 }, // Inventory count

  // Offer & Combo Configuration
  offer: {
    type: {
      type: String,
      enum: ['none', 'discount', 'b2g1', 'combo'],
      default: 'none'
    },
    value: { type: Number }, // Percentage or detailed value
    buyQuantity: { type: Number }, // For B2G1: Buy X
    getQuantity: { type: Number }, // For B2G1: Get Y
    label: { type: String }, // e.g. "Mega Saver Pack" or "Buy 2 Get 1 Free"
    bundleItems: [{ // If type is 'combo', list contents
      itemId: { type: String },
      qty: { type: Number }
    }]
  },
  prise: { type: Number },
  seoTitle: { type: String, required: true },
  seoDescription: { type: String, required: true },
  growthTips: { type: String, required: true },
  seoKeywords: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  isPublished: { type: Boolean, default: true },
  metadata: { type: Object, required: true },
  privateMetadata: { type: Object, required: true },
  tags: { type: [String], required: true },
  AffiliateLink: { type: String, required: false },
  AffiliateImage: { type: String, required: false },
  AffiliateName: { type: String, required: false },
  AffiliateDescription: { type: String, required: false },
  AffiliatePrise: { type: Number, required: false },
  AffiliateDiscount: { type: Number, required: false },
  AffiliatePriseAfterDiscount: { type: Number, required: false },
});

const Tree = mongoose.models.Tree || mongoose.model("Tree", treeSchema);

export default Tree;

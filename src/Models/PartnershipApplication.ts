import mongoose from "mongoose";

const PartnershipApplicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Company Name is required"],
        trim: true,
    },
    industry: {
        type: String,
        required: [true, "Industry is required"],
    },
    treeGoal: {
        type: String,
        required: [true, "Tree Goal is required"],
    },
    contactName: {
        type: String,
        required: [true, "Contact Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
        lowercase: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const PartnershipApplication =
    mongoose.models.PartnershipApplication ||
    mongoose.model("PartnershipApplication", PartnershipApplicationSchema);

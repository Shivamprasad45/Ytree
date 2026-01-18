import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
    ip: { type: String, required: true, index: true },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    loc: { type: String },
    userAgent: { type: String },
    browser: { type: String },
    os: { type: String },
    device: { type: String },
    referrer: { type: String },
    path: { type: String },
    title: { type: String },
    userId: { type: String },
    email: { type: String },
    screenResolution: { type: String },
    visitedAt: { type: Date, default: Date.now, index: true },
});

export const Visit =
    mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

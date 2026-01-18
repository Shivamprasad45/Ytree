import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
    // Session Metadata
    ip: { type: String, required: true, index: true },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    loc: { type: String },
    userAgent: { type: String },
    browser: { type: String },
    os: { type: String },
    device: { type: String },
    screenResolution: { type: String },
    userId: { type: String }, // Optional, links session to user
    email: { type: String },

    // Visited Pages Array
    visits: [
        {
            path: { type: String, required: true },
            title: { type: String },
            referrer: { type: String },
            visitedAt: { type: Date, default: Date.now },
        },
    ],

    // Timestamps
    createdAt: { type: Date, default: Date.now, index: true }, // Session start
    lastActiveAt: { type: Date, default: Date.now, index: true }, // Last activity
});

export const Visit =
    mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

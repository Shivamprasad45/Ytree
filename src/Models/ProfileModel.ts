import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProfile extends Document {
    user: mongoose.Types.ObjectId;
    bio?: string;
    phoneNumber?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    socialLinks?: {
        website?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        facebook?: string;
    };
    preferences?: {
        notifications?: boolean;
        newsletter?: boolean;
    };
    roleSpecificData?: {
        // NGO fields
        ngoName?: string;
        registrationNumber?: string;
        missionStatement?: string;
        areasOfOperation?: string[];
        certificateUrl?: string;

        // Corporate fields
        companyName?: string;
        industry?: string;
        csrFocus?: string;
        sustainabilityGoals?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        bio: { type: String, trim: true },
        phoneNumber: { type: String, trim: true },
        address: {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String,
        },
        socialLinks: {
            website: String,
            twitter: String,
            linkedin: String,
            instagram: String,
            facebook: String,
        },
        preferences: {
            notifications: { type: Boolean, default: true },
            newsletter: { type: Boolean, default: false },
        },
        roleSpecificData: {
            // NGO
            ngoName: String,
            registrationNumber: String,
            missionStatement: String,
            areasOfOperation: [String],
            certificateUrl: String,

            // Corporate
            companyName: String,
            industry: String,
            csrFocus: String,
            sustainabilityGoals: String,
        },
    },
    { timestamps: true }
);

// Index for faster user-based lookups
ProfileSchema.index({ user: 1 });

export const Profile: Model<IProfile> =
    mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

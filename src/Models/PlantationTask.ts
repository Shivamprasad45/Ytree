import mongoose, { Schema } from "mongoose";
import { cartSchema } from "./Cartmodel";

const PlantationTaskSchema = new Schema(
    {
        assignedBuyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignedNGO: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        plants: {
            type: [cartSchema],
            required: true,
        },
        status: {
            type: String,
            enum: ["assigned", "planted", "verified"],
            default: "assigned",
        },
        proofImages: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const PlantationTask =
    mongoose.models.PlantationTask ||
    mongoose.model("PlantationTask", PlantationTaskSchema);

export default PlantationTask;

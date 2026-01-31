import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";
import PlantationTask from "@/Models/PlantationTask";

// Get plantation tasks for the current Buyer/Business
export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await DbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch tasks where the user is the buyer
        const tasks = await PlantationTask.find({ assignedBuyer: user._id })
            .populate("assignedNGO", "firstName lastName email image role profile")
            .sort({ createdAt: -1 });

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("Error fetching buyer tasks:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

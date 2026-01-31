import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";
import PlantationTask from "@/Models/PlantationTask";

// Get tasks assigned to the current NGO
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

        if (user.role !== "NGO") {
            return NextResponse.json({ error: "Forbidden: Only NGOs can access tasks" }, { status: 403 });
        }

        const tasks = await PlantationTask.find({ assignedNGO: user._id })
            .populate("assignedBuyer", "firstName lastName email")
            .sort({ createdAt: -1 });

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Update task status (e.g., from assigned to planted)
export async function PATCH(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { taskId, status, proofImages } = body;

        if (!taskId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await DbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.role !== "NGO") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const task = await PlantationTask.findOne({ _id: taskId, assignedNGO: user._id });
        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        // Basic status flow validation
        const allowedStatuses = ["assigned", "planted", "verified"];
        if (!allowedStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const updateData: any = { status };
        if (proofImages) {
            updateData.proofImages = proofImages;
        }

        const updatedTask = await PlantationTask.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        );

        return NextResponse.json({ success: true, task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

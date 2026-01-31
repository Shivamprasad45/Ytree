import { NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";

export async function GET() {
    try {
        await DbConnect();

        const ngoCount = await User.countDocuments({ role: "NGO" });
        const corporateCount = await User.countDocuments({ role: "CORPORATE" });

        return NextResponse.json({
            success: true,
            stats: {
                ngos: ngoCount,
                corporates: corporateCount,
            },
        });
    } catch (error) {
        console.error("Error fetching partner stats:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

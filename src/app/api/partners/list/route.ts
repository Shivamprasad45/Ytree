import { NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";
import { Profile } from "@/Models/ProfileModel";

export async function GET() {
    try {
        await DbConnect();

        // Fetch users with NGO or CORPORATE roles and aggregate their profile data
        const partners = await User.aggregate([
            {
                $match: {
                    role: { $in: ["NGO", "CORPORATE"] }
                }
            },
            {
                $lookup: {
                    from: "profiles", // This should match the collection name in MongoDB
                    localField: "_id",
                    foreignField: "user",
                    as: "profileData"
                }
            },
            {
                $unwind: {
                    path: "$profileData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    role: 1,
                    image: 1,
                    profile: "$profileData",
                    // Mock association count for now, will be real data once associations are implemented
                    associationCount: { $floor: { $multiply: [{ $rand: {} }, 50] } }
                }
            }
        ]);

        return NextResponse.json({
            success: true,
            partners: partners || [],
        });
    } catch (error) {
        console.error("Error fetching partners list:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

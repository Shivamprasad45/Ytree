import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import DbConnect from "@/Utils/mongooesConnect";
import { Profile } from "@/Models/ProfileModel";
import { User } from "@/Models/SignupModel";

export async function GET(req: NextRequest) {
    try {

        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await DbConnect();
        const user = await User.findOne({ email: session.user.email }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const profile = await Profile.findOne({ user: user._id });

        return NextResponse.json({ user, profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        const { user: userData, profile: profileData } = body;

        await DbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userId = user._id;

       
        if (userData) {
            const allowedUserFields = ["firstName", "lastName"];
            const filteredUserData: any = {};
            allowedUserFields.forEach((field) => {
                if (userData[field] !== undefined) filteredUserData[field] = userData[field];
            });

            if (Object.keys(filteredUserData).length > 0) {
                await User.findByIdAndUpdate(userId, filteredUserData);
            }
        }

        if (profileData) {
            await Profile.findOneAndUpdate(
                { user: userId },
                { ...profileData, user: userId },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        return NextResponse.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

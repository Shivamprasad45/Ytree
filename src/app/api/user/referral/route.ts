import { NextResponse } from "next/server";
import { auth } from "@/auth";
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";

interface Session {
  user?: {
    email?: string | null;
    id?: string;
    role?: string;
    name?: string;
  };
}

interface UserDocument {
  email: string;
  referralCode: string;
  referredUsers?: number;
}

export async function GET() {
  try {
    const session: Session | null = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await DbConnect();

    const user: UserDocument | null = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      referralCode: user.referralCode,
      referredUsers: user.referredUsers ?? 0,
      rewards: calculateRewards(user.referredUsers ?? 0),
    });
  } catch (error) {
    console.error("Error fetching referral data:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral data" },
      { status: 500 }
    );
  }
}

// Function to calculate rewards based on number of referrals
function calculateRewards(referredUsers: number): number {
  return referredUsers * 50; // Example: 50 points per successful referral
}

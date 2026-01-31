// app/api/store-referral/route.ts
import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { ReferralTemp } from "@/Models/ReferralTempModel";

export async function POST(req: NextRequest) {
  try {
    const { email, referralCode, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    await DbConnect();

    await ReferralTemp.findOneAndUpdate(
      { email },
      { email, referralCode, role },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error storing session data:", error);
    return NextResponse.json(
      { error: "Failed to store session data" },
      { status: 500 }
    );
  }
}

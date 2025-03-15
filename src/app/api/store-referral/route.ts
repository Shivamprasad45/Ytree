// app/api/store-referral/route.ts
import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { ReferralTemp } from "@/Models/ReferralTempModel";

export async function POST(req: NextRequest) {
  try {
    const { email, referralCode } = await req.json();

    if (!email || !referralCode) {
      return NextResponse.json(
        { error: "Email and referral code required" },
        { status: 400 }
      );
    }

    await DbConnect();

    await ReferralTemp.findOneAndUpdate(
      { email },
      { email, referralCode },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error storing referral:", error);
    return NextResponse.json(
      { error: "Failed to store referral" },
      { status: 500 }
    );
  }
}

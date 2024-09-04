import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
User;
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";

// Connect to the database
DbConnect();

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }
    console.log(token, "djdgj");
    // Find user by token and check if token is still valid
    const user = await User.findOne({
      verificationToken: token,
    });
    console.log(user, "sdgdg");
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token ssf" },
        { status: 400 }
      );
    }

    // Update user's verification status
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    return NextResponse.redirect(
      new URL("https://greenfatuer.vercel.app/Auth/Verify-succes", req.url)
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

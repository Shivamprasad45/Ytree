import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Signup from "@/Models/SignupModel";
import DbConnect from "@/Utils/mongooesConnect";

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

    // Find user by token and check if token is still valid
    const user = await Signup.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update user's verification status
    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.redirect(new URL("/Auth/Verify-succes", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

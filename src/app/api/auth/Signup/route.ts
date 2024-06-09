import Signup from "@/Models/SignupModel";
import { Mail } from "@/Utils/Mailer";
import DbConnect from "@/Utils/mongooesConnect";

import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

DbConnect();
export async function POST(request: any) {
  try {
    const { Username, Email, password } = await request.json();
    console.log(Email, password);

    const existingUser = await Signup.findOne({ Email });
    if (existingUser) {
      return NextResponse.json({
        error: "Email and password already exist",
        success: false,
      });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Data ", Email, "   ", password, "   ", hashedPassword);

    // If user is created successfully, return a success message
    const user = await Signup.create({
      Username,
      Email,
      password: hashedPassword,
    });
    await Mail({ Email, Emailtype: "VERIFY", UserId: user._id });
    return NextResponse.json({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something error",
      success: false,
    });
  }
}

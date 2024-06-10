"use server";
import Signup from "@/Models/SignupModel";
import DbConnect from "@/Utils/mongooesConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// Ensure database connection
DbConnect();

// Define the POST handler function
export async function POST(req: any) {
  try {
    // Parse the request body to get email and password
    const { Email, password } = await req.json();

    // Check if user already exists
    const user = await Signup.findOne({ Email });

    // If user does not exist, return an error response
    if (!user) {
      return NextResponse.json({
        error: "User does not exist",
      });
    }

    // If user is not verified, return an error response
    if (!user.isVerfied) {
      return NextResponse.json({
        error: "You are not verified",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error response
    if (!isPasswordValid) {
      return NextResponse.json({
        error: "Password is not valid",
      });
    }

    // Create a JWT payload
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Sign the JWT token
    const token = jsonwebtoken.sign(
      tokenPayload,
      process.env.SECRET_KEY || "defaultSecretKey",
      {
        expiresIn: "1h", // Set token expiration as per your requirement
      }
    );

    // Create a response with a success message
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });

    // Set the JWT token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite: "strict", // Adjust sameSite policy as needed
      maxAge: 60 * 60, // Cookie expiration time (in seconds)
    });

    // Return the response
    return response;
  } catch (error) {
    // Catch and handle any errors
    console.error("Error in POST handler:", error);
    return NextResponse.json({
      error: "An error occurred during login",
    });
  }
}

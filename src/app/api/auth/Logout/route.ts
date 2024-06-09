import DbConnect from "@/Utils/mongooesConnect";
import { NextResponse } from "next/server";

DbConnect();
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    // Setting the token cookie to an empty value and setting it to expire immediately
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Setting the expiration date to the past
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Logout Failed",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

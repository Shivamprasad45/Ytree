import { User } from "@/Models/SignupModel";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DbConnect();

    // Fetch user data from MongoDB
    const usersFromDb = await User.find(
      {},
      { _id: 1, firstName: 1, lastName: 1 }
    ).exec();

    // If no users found, return 404
    if (!usersFromDb) {
      return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }

    // Create a response with no caching headers
    const response = NextResponse.json(usersFromDb, { status: 200 });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { User } from "@/Models/SignupModel";

import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    const coordinatesFromDb = await User.find(
      {},
      { _id: 1, firstName: 1, lastName: 1 }
    ).exec();

    if (!coordinatesFromDb) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    return NextResponse.json(coordinatesFromDb, { status: 200 });
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

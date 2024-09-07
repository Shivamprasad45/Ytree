import Plants_coordinates from "@/Models/CoordinatsPlants";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    // Fetch data from MongoDB
    const coordinatesFromDb = await Plants_coordinates.find(
      {},
      { _id: 0, late: 1, long: 1, commonName: 1, UserId: 1, Plant_Addresses: 1 }
    ).exec();

    // If no data found, return 404
    if (!coordinatesFromDb) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    // Set headers to prevent caching
    const response = NextResponse.json(coordinatesFromDb, { status: 200 });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import Plants_coordinates from "@/Models/CoordinatsPlants";

import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    const coordinatesFromDb = await Plants_coordinates.find(
      {},
      { _id: 0, late: 1, long: 1, commonName: 1, UserId: 1, Plant_Addresses: 1 }
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

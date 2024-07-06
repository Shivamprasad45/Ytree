import Plants_coordinates from "@/Models/CoordinatsPlants";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await DbConnect();
    const Plant_coord_data = await req.json();
    const Coords = await Plants_coordinates.insertMany(Plant_coord_data);
    if (!Coords) {
      return NextResponse.json({ error: "not found" });
    }
    return NextResponse.json({ success: true, message: "Save successfully" });
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json({ error: error });
  }
}

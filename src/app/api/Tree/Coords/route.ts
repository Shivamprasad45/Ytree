import Plants_coordinates from "@/Models/CoordinatsPlants";
import Mytree from "@/Models/Mytree";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await DbConnect();
    const Plant_coord_data = await req.json();
    await Mytree.findByIdAndUpdate(Plant_coord_data._id, {
      status: 3,
      age: Date.now(),
    });
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
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await DbConnect();

    const id = req.nextUrl.searchParams.get("id");
    const Coords = await Plants_coordinates.findById(id);
    if (!Coords) {
      return NextResponse.json({ error: "not found" });
    }
    return NextResponse.json({ data: Coords });
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json({ error: error });
  }
}

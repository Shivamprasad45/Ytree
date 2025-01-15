import Plants_coordinates from "@/Models/CoordinatsPlants";
import Mytree from "@/Models/Mytree";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

// Define a Zod schema for ObjectId validation
const ObjectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export async function POST(req: NextRequest) {
  try {
    await DbConnect();
    const Plant_coord_data = await req.json();

    // Validate the _id field

    const dtat = await Mytree.findOneAndUpdate(
      { findtree_id: Plant_coord_data.find_id },
      {
        status: 3,
        age: Date.now(),
      }
    );

    const Coords = await Plants_coordinates.insertMany(Plant_coord_data);

    if (!Coords) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Save successfully" });
  } catch (error: any) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    const id = req.nextUrl.searchParams.get("id");

    // Validate the id parameter

    const Coords = await Plants_coordinates.findOne({ find_id: id });

    if (!Coords) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(Coords);
  } catch (error: any) {
    console.error("Error fetching tree details:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

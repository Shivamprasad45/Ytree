import Mytree from "@/Models/Mytree";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const Plant_coord_data = await req.json();
    console.log(Plant_coord_data, "f;d;f;ld;f");

    const plant = await Mytree.findById(Plant_coord_data._ID);
    console.log(plant, "Plant");
    return NextResponse.json(plant);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: error });
  }
}

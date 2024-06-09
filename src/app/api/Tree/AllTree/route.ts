import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    const tree = await Tree.find();

    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    return NextResponse.json(tree, { status: 200 });
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

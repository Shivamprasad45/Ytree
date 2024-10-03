import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    // Get query params from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1"); // Fallback to "1" if null
    const limit = parseInt(searchParams.get("limit") ?? "8"); // Fallback to "8" if null
    const skip = (page - 1) * limit;

    const tree = await Tree.find().skip(skip).limit(limit);

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

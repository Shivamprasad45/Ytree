import Tree from "@/Models/TreeCollection";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DbConnect();

    // Extract the id from the request URL

    const Search = req.nextUrl.searchParams;

    const id = Search.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing tree ID" }, { status: 400 });
    }

    const treeDetails = await Tree.findById(id);

    if (!treeDetails) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    return NextResponse.json(treeDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

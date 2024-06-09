import Mytree from "@/Models/Mytree";
import DbConnect from "@/Utils/mongooesConnect";

import { NextRequest, NextResponse } from "next/server";

// Improved version of the GET function for fetching tree data
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Establish database connection
    await DbConnect();

    // Fetch all tree data from the collection
    const TreeData = await Mytree.find();

    // Log the fetched data for debugging

    if (TreeData.length === 0) {
      return NextResponse.json({
        message: "Data not found",
      });
    }
    // Return the fetched data as a JSON response
    return NextResponse.json(TreeData);
  } catch (error: any) {
    // Log the error for debugging
    console.error(error);

    // Return an error response with a status code
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

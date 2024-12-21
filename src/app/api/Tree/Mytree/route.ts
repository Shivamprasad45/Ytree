import Mytree from "@/Models/Mytree";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Establish database connection
    await DbConnect();

    // Get the User_Id from query parameters
    const userId = req.nextUrl.searchParams.get("User_Id");

    // Validate the presence of User_Id
    if (!userId) {
      return NextResponse.json(
        {
          message: "User_Id is required",
        },
        { status: 400 }
      );
    }

    // Fetch tree data from the collection

    const treeData = await Mytree.find({ UserId: userId });

    // Log the fetched data for debugging

    // Check if no data was found
    if (treeData.length === 0) {
      return NextResponse.json(
        {
          message: "Data not found",
        },
        { status: 404 }
      );
    }

    // Return the fetched data as a JSON response
    return NextResponse.json(treeData);
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

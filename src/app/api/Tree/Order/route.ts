import cart from "@/Models/Cartmodel";
import Order from "@/Models/CheckoutSchema";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
import { IPlantProfile, Plant_order, TreeCarts } from "../../../../../type";
import Mytree from "@/Models/Mytree";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Establish database connection
    await DbConnect();
    const data = await req.json();

    // Validate the presence of User_Id

    const treeData = await Order.insertMany(data);
    await cart.deleteMany({
      UserId: data.plants[0].UserId,
    });

    // Assuming TreeCarts and IPlantProfile are properly defined interfaces
    treeData[0].plants.forEach(async (item: TreeCarts) => {
      for (let i = 0; i < item.quantity; i++) {
        const mytreedata: IPlantProfile = {
          _id: item._id,
          Plaintid: item.Plant_id,
          UserId: item.UserId,
          age: Date.now(),
          imageUrl: item.imageURL,
          name: item.commonName,
          status: 0,
        };

        await Mytree.insertMany(mytreedata);
      }
    });

    // Check if no data was found
    if (treeData.length === 0) {
      return NextResponse.json({
        error: "Data not save",
      });
    }

    // Return the fetched data as a JSON response
    return NextResponse.json({ success: true, message: "save successful" });
  } catch (error: any) {
    // Log the error for debugging
    console.error(error);

    // Return an error response with a status code
    return NextResponse.json({
      error: error.message || "An unexpected error occurred",
    });
  }
}

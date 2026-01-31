import cart from "@/Models/Cartmodel";
import Order from "@/Models/CheckoutSchema";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
import { InMytrees, TreeCarts } from "../../../../type";
import Mytree from "@/Models/Mytree";
import PlantationTask from "@/Models/PlantationTask";
import shortid from "shortid";
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Establish database connection
    await DbConnect();
    const data = await req.json();

    // Validate the presence of User_Id
    console.log(data.plants[0].UserId, "User Id");
    const treeData = await Order.insertMany(data);
    await cart.deleteMany({
      UserId: data.plants[0].UserId,
    });

    // Assuming TreeCarts and IPlantProfile are properly defined interfaces
    treeData[0].plants.forEach(async (item: TreeCarts) => {
      for (let i = 0; i < item.quantity; i++) {
        const id = shortid.generate();
        const mytreedata: InMytrees = {
          findtree_id: id,
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

    // Create Plantation Task if an NGO is assigned
    if (data.assignedNGO) {
      await PlantationTask.create({
        assignedBuyer: data.plants[0].UserId,
        assignedNGO: data.assignedNGO,
        orderId: data.Orderid,
        plants: data.plants,
        status: "assigned",
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

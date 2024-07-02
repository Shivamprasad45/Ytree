import cart from "@/Models/Cartmodel";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
DbConnect();
export async function DELETE(request: NextRequest) {
  try {
    const { Symbol } = await request.json();

    const Id = request.nextUrl.searchParams.get("Id");
    const UserId = request.nextUrl.searchParams.get("UserId");

    if (Symbol === "Remove") {
      const d = await cart.findOneAndDelete({ Plant_id: Id, UserId: UserId });
      return NextResponse.json({ success: true, message: "Remove success" });
    }

    if (Symbol === "Plus") {
      const d = await cart.findOneAndUpdate(
        { Plant_id: Id, UserId: UserId },
        { $inc: { quantity: 1 } }, // Increment the quantity by 1
        { new: true } // Optionally, return the updated document
      );
      // Log the updated document (optional)
      return NextResponse.json({ success: true, message: "Increase success" });
    }

    if (Symbol === "Minus") {
      const d = await cart.findOneAndUpdate(
        { Plant_id: Id, UserId: UserId },
        { $inc: { quantity: -1 } }, // Decrement the quantity by 1
        { new: true } // Optionally, return the updated document
      );
      return NextResponse.json({ success: true, message: "Minus success" });
      // Log the updated document (optional)
    }

    return NextResponse.json({ success: true, message: "Remove success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: "Not found" });
  }
}

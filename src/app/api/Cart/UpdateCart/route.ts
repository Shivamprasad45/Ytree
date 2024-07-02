import cart from "@/Models/Cartmodel";
import DbConnect from "@/Utils/mongooesConnect";

import { NextRequest, NextResponse } from "next/server";
DbConnect();
export async function POST(request: NextRequest) {
  try {
    const Updatedata = await request.json();

    const Id = request.nextUrl.searchParams.get("Id");
    const UserId = request.nextUrl.searchParams.get("UserId");
    console.log(Id, UserId, "User id");
    const Cart = await cart.findOneAndUpdate(
      { Plant_id: Id, UserId: UserId },
      Updatedata,
      { new: true } // Return the updated document
    );

    return NextResponse.json(Cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: "Not found" });
  }
}

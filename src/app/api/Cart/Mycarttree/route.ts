import cart from "@/Models/Cartmodel";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
DbConnect();

export async function GET(request: NextRequest) {
  try {
    const Id = request.nextUrl.searchParams.get("Id");
    const Cart = await cart.find({ UserId: Id });

    return NextResponse.json(Cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: "Not found" });
  }
}

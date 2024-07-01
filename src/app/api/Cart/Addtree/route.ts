import cart from "@/Models/Cartmodel";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
DbConnect();
export async function POST(request: NextRequest) {
  try {
    const cart_data = await request.json();
    console.log(cart_data, "Cart data");
    const Cart = await cart.insertMany(cart_data);
    console.log(Cart, "CArt");
    return NextResponse.json({ success: true, message: "Add success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: "Add fail" });
  }
}

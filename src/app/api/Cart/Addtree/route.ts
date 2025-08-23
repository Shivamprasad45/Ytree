import cart from "@/Models/Cartmodel";
import DbConnect from "@/Utils/mongooesConnect";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Establish a fresh database connection for each request
    await DbConnect();

    // Validate and sanitize user input
    const cart_data = await request.json();
    console.log(cart_data, "kii");
    // Insert data into the database
    const Cart = await cart.insertMany(cart_data);

    // Log success and return a success response
    // console.log(Cart, "Cart data added successfully");
    return NextResponse.json({ success: true, message: "Add success" });
  } catch (error: any) {
    // Log the error and return a more informative error message
    console.error(error);
    return NextResponse.json({ error: error.message, message: "Add fail" });
  }
}

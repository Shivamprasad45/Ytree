"use server";
import jsonwebtoken from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export default async function getdatafromtoken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value!;
    console.log("Token from cookies:", token);

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY || "defaultSecretKey"
    );

    return decodedToken.id!;
  } catch (error: any) {
    console.error("Error in getdatafromtoken:", error.message);
    return null;
  }
}

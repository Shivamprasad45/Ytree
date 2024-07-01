"use server";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";
export default async function getdatafromtoken(req: any) {
  try {
    const token = (await req.cookies.get("token")?.value!) || "";

    const decodedToken: any = await jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY!
    );

    return decodedToken.id;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

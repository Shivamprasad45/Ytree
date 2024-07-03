import jsonwebtoken from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export default async function getdatafromtoken(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "";

    console.log(token, "token");

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY!
    );

    return decodedToken.id!;
  } catch (error: any) {
    console.error("Error in getdatafromtoken:", error.message);
    return null;
  }
}

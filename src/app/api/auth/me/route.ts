import Signup from "@/Models/SignupModel";
import { Mail } from "@/Utils/Mailer";
import DbConnect from "@/Utils/mongooesConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import getdatafromtoken from "@/Utils/getdatafromtoken";
DbConnect();

export async function POST(req: any) {
  try {
    const userId = await getdatafromtoken(req);
    const user = await Signup.findOne({ _id: userId }).select("-password");
    //check if there is no user
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {}
}

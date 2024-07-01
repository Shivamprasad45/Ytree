"use server";
import Signup from "@/Models/SignupModel";

import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";

import getdatafromtoken from "@/Utils/getdatafromtoken";

DbConnect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getdatafromtoken(req);
    console.log(userId, "UserId");
    if (userId === null) {
      return NextResponse.json({
        message: "User not userid found",
        error: "error",
      });
    }
    const user = await Signup.findOne({ _id: userId }).select("-password");
    console.log(user, "user");
    //check if there is no user
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "User  not  fetch",
      error: error.message,
    });
  }
}

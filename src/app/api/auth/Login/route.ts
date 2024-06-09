"use server";
import Signup from "@/Models/SignupModel";
import { Mail } from "@/Utils/Mailer";
import DbConnect from "@/Utils/mongooesConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
DbConnect();

export async function POST(req: any) {
  try {
    const { Email, password } = await req.json();

    const AlreadyExist = await Signup.findOne({ Email });
    console.log(AlreadyExist, "Alreday");
    if (!AlreadyExist) {
      return NextResponse.json({
        error: "User not exist",
      });
    }
    if (AlreadyExist.isVerfied === false) {
      return NextResponse.json({
        error: "you are not verified",
      });
    }
    const Valiedpasssword = await bcrypt.compare(
      password,
      AlreadyExist.password
    );

    if (!Valiedpasssword) {
      return NextResponse.json({
        error: "Password not valid",
      });
    }

    const Tokenpayload = {
      id: AlreadyExist._id,
      Username: AlreadyExist.Username,
      Email: AlreadyExist.Email,
    };

    const Token = jsonwebtoken.sign(Tokenpayload, process.env.SECRET_KEY!);

    const response = NextResponse.json({
      message: "Logged In success",
      success: true,
    });

    response.cookies.set("token", Token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      Error: error,
    });
  }
}

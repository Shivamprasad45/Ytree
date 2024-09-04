import { User } from "@/Models/SignupModel";
import { Mail } from "@/Utils/Mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Ensure that the request is JSON
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    // Parse the JSON body
    const { ResendEmail } = await req.json();
    console.log(ResendEmail, "sfsfk");
    // Ensure ResendEmail is a string
    if (typeof ResendEmail !== "string") {
      return NextResponse.json({ error: "Invalid email format" });
    }

    // Query the database with the extracted email
    const user = await User.findOne({ email: ResendEmail });
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    if (user.isVerfied) {
      return NextResponse.json({ error: "you are already verified" });
    }

    await Mail({ Email: user.email, Emailtype: "VERIFY", UserId: user._id });

    return NextResponse.json({ email: ResendEmail });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

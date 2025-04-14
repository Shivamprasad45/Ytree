import Mytree from "@/Models/Mytree";
import { User } from "@/Models/SignupModel";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";

export async function POST(req: NextRequest) {
  try {
    await DbConnect();
    const plantId = shortid.generate();

    const { UserId, imageUrl, name, age, findtree_id, Plaintid, status } =
      await req.json();

    await Mytree.create({
      UserId,
      imageUrl:
        "https://res.cloudinary.com/dn633knvv/image/upload/v1730888019/518619119_Significance-of-the-Peepal-Tree-in-Hinduism_wc7bmn.jpg",
      name: "Pepel tree",
      age,
      findtree_id: plantId,
      Plaintid: "peple tree",
      status,
    });

    await User.findByIdAndUpdate(
      UserId,
      { $inc: { referredUsers: -10 } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Tree claimed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

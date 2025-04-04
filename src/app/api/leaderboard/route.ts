// import DbConnect from "@/lib/mongodbconnect";
// import Leader from "@/models/Leader";
import Leader from "@/Models/LeaderBoard";
import DbConnect from "@/Utils/mongooesConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await DbConnect();

  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const district = searchParams.get("district");

  const filter: any = {};
  if (state) filter.state = state;
  if (district) filter.district = district;

  const leaderboard = await Leader.aggregate([
    { $match: filter },
    {
      $group: {
        _id: "$UserId",
        totalTrees: { $sum: "$Trees" },
        name: { $first: "$name" }, // Take the first occurrence of the name
      },
    },
    { $sort: { totalTrees: -1 } },
    { $limit: 5 },
  ]);

  return NextResponse.json(leaderboard);
}

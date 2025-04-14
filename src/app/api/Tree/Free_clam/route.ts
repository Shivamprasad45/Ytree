import FreeTreeUser from "@/Models/Free_tree"; // Renamed for clarity
import Leader from "@/Models/LeaderBoard";
import Mytree from "@/Models/Mytree";
import DbConnect from "@/Utils/mongooesConnect"; // Check spelling (mongooes -> mongoose)
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import shortid from "shortid";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    await DbConnect();

    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Destructure with required field checks
    const requiredFields = [
      "address",
      "email",
      "late",
      "long",
      "reason",
      "mobil_number",
      "name",
      "treeType",
      "photoUrl",
      "findtree_id",
      "UserId",
      "district",
      "state",
    ];

    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const {
      address,
      email,
      late: lat, // Consider renaming to latitude
      long: lng, // Consider renaming to longitude
      reason,
      mobil_number,
      name,
      treeType,
      photoUrl,
      findtree_id,
      UserId,
      district,
      state,
    } = body;

    // Check for existing claims
    const [existingEmail, existingNumber] = await Promise.all([
      FreeTreeUser.findOne({ email }),
      FreeTreeUser.findOne({ mobil_number }),
    ]);

    if (existingEmail || existingNumber) {
      return NextResponse.json({
        message:
          "You have already claimed a free tree. Please purchase instead.",
        error: "Conflict",
      });
    }

    // Transaction-like pattern (MongoDB needs replica set for real transactions)
    const plantId = shortid.generate();

    // Create all entries first
    const [myTree, user, leader] = await Promise.all([
      Mytree.create({
        Plaintid: plantId, // Consider renaming to plantId
        findtree_id,
        UserId,
        age: Date.now(),
        imageUrl: photoUrl,
        name,
        status: 0,
      }),
      FreeTreeUser.create({
        email,
        address,
        late: lat,
        long: lng,
        reason,
        mobil_number,
        name,
        treeType,
        photoUrl,
      }),
      Leader.create({
        UserId,
        district,
        state,
        name,
      }),
    ]);

    // Send email notification
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "your-admin-email@example.com", // Replace with actual admin email
        subject: "New Free Tree Claimed!",
        html: `... (same email template) ...`,
      });
    } catch (emailError) {
      console.error("Email failed to send:", emailError);
      // Consider logging to external service but still return success
    }

    return NextResponse.json(
      {
        message: "Free tree claimed successfully!",
        success: true,
        plantId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

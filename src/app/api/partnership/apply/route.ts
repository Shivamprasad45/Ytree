import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { PartnershipApplication } from "@/Models/PartnershipApplication";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { companyName, industry, treeGoal, contactName, email } = body;

        // Basic Validation
        if (!companyName || !industry || !treeGoal || !contactName || !email) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await DbConnect();

        const newApplication = new PartnershipApplication({
            companyName,
            industry,
            treeGoal,
            contactName,
            email,
        });

        await newApplication.save();

        return NextResponse.json(
            { message: "Application submitted successfully", data: newApplication },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Partnership Application Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}

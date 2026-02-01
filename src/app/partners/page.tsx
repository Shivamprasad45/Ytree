
import DbConnect from "@/Utils/mongooesConnect";
import { User } from "@/Models/SignupModel";
import { Profile } from "@/Models/ProfileModel"; // Importing to ensure schema registration if needed
import PartnersClient from "./PartnersClient";

export const dynamic = 'force-dynamic';

async function getPartnersData() {
    await DbConnect();

    // Fetch users with NGO or CORPORATE roles and aggregate their profile data
    const partners = await User.aggregate([
        {
            $match: {
                role: { $in: ["NGO", "CORPORATE"] }
            }
        },
        {
            $lookup: {
                from: "profiles", // This should match the collection name in MongoDB
                localField: "_id",
                foreignField: "user",
                as: "profileData"
            }
        },
        {
            $unwind: {
                path: "$profileData",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                role: 1,
                image: 1,
                profile: "$profileData",
                // Mock association count for now, will be real data once associations are implemented
                associationCount: { $floor: { $multiply: [{ $rand: {} }, 50] } }
            }
        }
    ]);

    return partners;
}

export default async function PartnersPage() {
    const rawPartners = await getPartnersData();
    // Serialize to simple JSON to avoid "Only plain objects can be passed to Client Components" error with ObjectIds
    const partners = JSON.parse(JSON.stringify(rawPartners));

    const stats = {
        ngos: partners.filter((p: any) => p.role === "NGO").length,
        corporates: partners.filter((p: any) => p.role === "CORPORATE").length
    };

    return (
        <PartnersClient initialPartners={partners} initialStats={stats} />
    );
}

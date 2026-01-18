import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { Visit } from "@/Models/Visit";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { path, referrer, screenResolution, title, userId, email } = body;

        // 1. Get IP
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (ip === "unknown" || ip === "::1" || ip === "127.0.0.1") {
            console.log("Skipping tracking for localhost/unknown");
            return NextResponse.json({ success: true, message: "Skipped localhost" });
        }

        await DbConnect();

        // 2. Find Existing Session (Active in last 24 hours)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Find session by userId OR ip
        let sessionQuery: any = {
            lastActiveAt: { $gte: twentyFourHoursAgo }
        };

        if (userId) {
            sessionQuery.userId = userId;
        } else {
            sessionQuery.ip = ip;
            // Ensure we don't accidentally pick up a logged-in session if we are now anonymous (unlikely but safe)
            sessionQuery.userId = { $exists: false };
        }

        let session = await Visit.findOne(sessionQuery).sort({ lastActiveAt: -1 });

        if (session) {
            // --- DEBOUNCE LOGIC ---
            // Check the last visited page in the array
            const lastVisit = session.visits[session.visits.length - 1];

            if (lastVisit) {
                const timeDiff = Date.now() - new Date(lastVisit.visitedAt).getTime();
                const isSamePage = lastVisit.path === path;

                // If same page visited less than 1 minute ago, ignore
                if (isSamePage && timeDiff < 60 * 1000) {
                    return NextResponse.json({ success: true, message: "Debounced" });
                }
            }

            // Add new visit to array
            session.visits.push({
                path,
                title,
                referrer,
                visitedAt: new Date(),
            });

            // Update metadata if strictly needed (e.g. user logged in during anonymous session) - keeping simple for now
            if (userId && !session.userId) {
                session.userId = userId;
                session.email = email;
            }

            session.lastActiveAt = new Date();
            await session.save();

            return NextResponse.json({ success: true, message: "Session updated" });

        } else {
            // --- NEW SESSION ---

            // 3. Get Geo Location (Only on new session)
            let geoData = { city: "", region: "", country: "", loc: "" };
            try {
                const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
                const data = await geoRes.json();
                if (data.status === "success") {
                    geoData = {
                        city: data.city,
                        region: data.regionName,
                        country: data.country,
                        loc: `${data.lat},${data.lon}`,
                    };
                }
            } catch (err) {
                console.error("Geo fetch failed:", err);
            }

            // 4. Parse User Agent
            const userAgent = req.headers.get("user-agent") || "";
            let browser = "Unknown";
            let os = "Unknown";
            let device = "Desktop";

            if (/mobile/i.test(userAgent)) device = "Mobile";
            if (/like Mac OS X/.test(userAgent)) {
                os = "iOS";
                device = "Mobile";
            } else if (/Android/.test(userAgent)) {
                os = "Android";
                device = "Mobile";
            } else if (/Linux/.test(userAgent)) os = "Linux";
            else if (/Windows NT/.test(userAgent)) os = "Windows";
            else if (/Macintosh/.test(userAgent)) os = "macOS";

            if (/Chrome/.test(userAgent)) browser = "Chrome";
            else if (/Firefox/.test(userAgent)) browser = "Firefox";
            else if (/Safari/.test(userAgent)) browser = "Safari";
            else if (/Edge/.test(userAgent)) browser = "Edge";

            // 5. Create Session
            await Visit.create({
                ip,
                ...geoData,
                userAgent,
                browser,
                os,
                device,
                screenResolution,
                userId,
                email,
                visits: [{
                    path,
                    title,
                    referrer,
                    visitedAt: new Date(),
                }],
                lastActiveAt: new Date(),
            });

            return NextResponse.json({ success: true, message: "New session created" });
        }
    } catch (error) {
        console.error("Tracking Error:", error);
        return NextResponse.json(
            { success: false, error: "Tracking failed" },
            { status: 500 }
        );
    }
}

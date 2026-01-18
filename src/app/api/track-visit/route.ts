import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/Utils/mongooesConnect";
import { Visit } from "@/Models/Visit";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { path, referrer, screenResolution } = body;

        // 1. Get IP
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (ip === "unknown" || ip === "::1" || ip === "127.0.0.1") {
            // Skip logging for localhost/unknown if desired, or log as 'Localhost'
            console.log("Skipping tracking for localhost/unknown");
            return NextResponse.json({ success: true, message: "Skipped localhost" });
        }

        await DbConnect();

        // 2. Duplicate Check (Debounce) - Check if visited in last 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const existingVisit = await Visit.findOne({
            ip: ip,
            path: path,
            visitedAt: { $gte: tenMinutesAgo },
        });

        if (existingVisit) {
            return NextResponse.json({ success: true, message: "Duplicate visit ignored" });
        }

        // 3. Get Geo Location
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

        // 4. Parse User Agent (Basic Parsing)
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

        // 5. Save to DB
        await Visit.create({
            ip,
            ...geoData,
            userAgent,
            browser,
            os,
            device,
            referrer,
            path,
            screenResolution,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking Error:", error);
        return NextResponse.json(
            { success: false, error: "Tracking failed" },
            { status: 500 }
        );
    }
}

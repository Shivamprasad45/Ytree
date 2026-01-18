"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function VisitTracker() {
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const trackVisit = async () => {
            try {
                const screenResolution = `${window.screen.width}x${window.screen.height}`;
                const referrer = document.referrer;
                const title = document.title;
                const userId = session?.user?.id || session?.user?.email || undefined; // Adjust based on user object
                const email = session?.user?.email || undefined;


                await fetch("/api/track-visit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        path: pathname,
                        referrer,
                        screenResolution,
                        title,
                        userId,
                        email
                    }),
                });
            } catch (error) {
                console.error("Failed to track visit:", error);
            }
        };

        trackVisit();
    }, [pathname, session]); // Runs when path or session changes

    return null;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const trackVisit = async () => {
            try {
                const screenResolution = `${window.screen.width}x${window.screen.height}`;
                const referrer = document.referrer;

                await fetch("/api/track-visit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        path: pathname,
                        referrer,
                        screenResolution,
                    }),
                });
            } catch (error) {
                console.error("Failed to track visit:", error);
            }
        };

        trackVisit();
    }, [pathname]); // Runs everytime path changes

    return null;
}

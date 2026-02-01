"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type GoogleAdProps = {
    slotId: string;
    format?: "auto" | "fluid" | "rectangle";
    responsive?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const GoogleAd = ({ slotId, format = "auto", responsive = true, className = "", style = {} }: GoogleAdProps) => {
    const adRef = useRef<HTMLModElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const adsbygoogle = (window as any).adsbygoogle || [];
                // Only push if the ad hasn't been filled yet to avoid "All ins elements..." errors in dev
                if (adRef.current && adRef.current.innerHTML === "") {
                    adsbygoogle.push({});
                }
            }
        } catch (err) {
            console.error("Google AdSense error:", err);
        }
    }, [pathname]); // Re-run on path change to ensure visibility if needed (though new components mount anyway)

    // Use a different key on pathname change to force re-render if necessary, 
    // but usually simple mounting is enough. unique key helps with SPA nav.

    return (
        <div className={`google-ad-container my-4 overflow-hidden ${className}`} style={{ minHeight: "250px", ...style }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", ...style }}
                data-ad-client="ca-pub-7763744084891101" // User's client ID from layout.tsx
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
                ref={adRef}
            ></ins>
            <div className="text-[10px] text-gray-300 text-center w-full">Advertisement</div>
        </div>
    );
};

export default GoogleAd;

"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function GoogleAds() {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // Ensure the ad hasn't already been loaded in this slot
            if (adRef.current && adRef.current.innerHTML === "") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error("Google AdSense error:", err);
        }
    }, []);

    return (
        <div className="w-full flex justify-center items-center my-8 overflow-hidden min-h-[100px] bg-gray-50/50 rounded-lg">
            {/* 
        REPLACE 'data-ad-slot' VALUE BELOW WITH YOUR ACTUAL AD UNIT ID FROM GOOGLE ADSENSE 
        currently set to a placeholder '1234567890'
      */}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client="ca-pub-7763744084891101"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />

            {/* Visual placeholder for development only - can be removed in production */}
            <span className="sr-only">Advertisement</span>
        </div>
    );
}
